import OpenAI from 'npm:openai'

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
}

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
})

const estimateSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['carName', 'basePrice', 'rows', 'assumptions'],
  properties: {
    carName: {
      type: 'string',
      description: 'Vehicle make and model, including year/version if known.',
    },
    basePrice: {
      type: 'number',
      description: 'Estimated vehicle purchase price in euros.',
    },
    rows: {
      type: 'array',
      description: 'Import cost estimate rows shown in the frontend table.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['concept', 'detail', 'cost'],
        properties: {
          concept: {
            type: 'string',
            description: 'Short cost category label in Spanish.',
          },
          detail: {
            type: 'string',
            description: 'Brief explanation of how this cost was estimated, in Spanish.',
          },
          cost: {
            type: 'number',
            description: 'Estimated cost in euros, without currency symbol.',
          },
        },
      },
    },
    assumptions: {
      type: 'array',
      description: 'Important assumptions used for the estimate, in Spanish.',
      items: {
        type: 'string',
      },
    },
  },
} as const

type EstimateRow = {
  concept: string
  detail: string
  cost: number
}

type ImportEstimate = {
  assumptions: string[]
  basePrice: number
  carName: string
  rows: EstimateRow[]
}

class EstimateInputError extends Error {}

type CarInputContext = {
  sourceUrl?: string
  userText: string
}

function extractFirstUrl(value: string) {
  const [url] = value.match(/https?:\/\/[^\s<>"']+/i) ?? []

  if (!url) return undefined

  try {
    return new URL(url).toString()
  } catch {
    return undefined
  }
}

function getCarInputContext(carPrompt: string): CarInputContext {
  const sourceUrl = extractFirstUrl(carPrompt)

  if (!sourceUrl) {
    return { userText: carPrompt }
  }

  return {
    sourceUrl,
    userText: carPrompt,
  }
}

function getImportCommission(basePrice: number) {
  if (basePrice < 15000) return 1600
  if (basePrice < 20000) return 1800
  if (basePrice < 25000) return 2000
  if (basePrice < 30000) return 2300
  if (basePrice < 50000) return 2500
  return 3000
}

function findRowCost(rows: EstimateRow[], concept: string) {
  const row = rows.find((item) => item.concept.toLowerCase() === concept.toLowerCase())
  return typeof row?.cost === 'number' && Number.isFinite(row.cost) ? row.cost : 0
}

function normalizeEstimate(estimate: ImportEstimate): ImportEstimate {
  const basePrice =
    typeof estimate.basePrice === 'number' && Number.isFinite(estimate.basePrice)
      ? estimate.basePrice
      : 0

  if (basePrice <= 0) {
    throw new EstimateInputError('No se pudo identificar el precio del coche.')
  }

  if (basePrice < 1000) {
    throw new EstimateInputError(
      'El precio detectado no parece válido. Pega el precio anunciado junto al enlace para calcular el estimado.',
    )
  }

  return {
    ...estimate,
    basePrice,
    rows: [
      {
        concept: 'Impuesto de Matriculación',
        detail: 'Tasa de Hacienda para matricular el vehículo en España',
        cost: findRowCost(estimate.rows, 'Impuesto de Matriculación'),
      },
      {
        concept: 'Impuesto de Circulación',
        detail: 'Impuesto municipal anual necesario para circular en España',
        cost: findRowCost(estimate.rows, 'Impuesto de Circulación'),
      },
      {
        concept: 'Gestoría en España',
        detail: 'Tramitación administrativa y presentación de documentación',
        cost: 250,
      },
      {
        concept: 'ITV',
        detail: 'Inspección técnica para homologar y registrar el coche en España',
        cost: 200,
      },
      {
        concept: 'Placas Alemanas y Seguro',
        detail: 'Matrículas temporales y seguro para trasladar el coche',
        cost: 250,
      },
      {
        concept: 'Placas Españolas',
        detail: 'Matrículas definitivas españolas para el vehículo',
        cost: 35,
      },
      {
        concept: 'Gastos (pasaje, gasolina y peajes)',
        detail: 'Costes estimados del viaje para recoger y traer el coche',
        cost: 700,
      },
      {
        concept: 'Comisión de importación',
        detail: 'Servicio de búsqueda, coordinación y gestión de la importación',
        cost: getImportCommission(basePrice),
      },
    ],
  }
}

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, {
    headers: corsHeaders,
    status,
  })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    })
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  const apiKey = Deno.env.get('OPENAI_API_KEY')

  if (!apiKey) {
    return jsonResponse({ error: 'OPENAI_API_KEY is not configured' }, 500)
  }

  try {
    const { car } = await request.json()
    const carPrompt = typeof car === 'string' ? car.trim() : ''

    if (!carPrompt) {
      return jsonResponse({ error: 'Pega el enlace del anuncio para calcular el estimado.' }, 400)
    }

    const carContext = getCarInputContext(carPrompt)

    if (!carContext.sourceUrl) {
      return jsonResponse(
        {
          error:
            'Introduce un enlace válido del anuncio. Si aún no tienes uno, busca tu coche en mobile.de.',
        },
        400,
      )
    }

    const response = await openai.responses.create({
      model: Deno.env.get('OPENAI_MODEL') ?? 'gpt-5.2',
      tools: [
        {
          type: 'web_search',
        },
      ],
      input: [
        {
          role: 'system',
          content: [
            'Eres un asesor experto en importacion de coches desde Europa a Espana.',
            'Calcula una estimacion orientativa para importar el coche que proporcione el usuario.',
            'Identifica el nombre, marca y modelo del coche y devuelvelo en carName.',
            'Si el usuario proporciona un enlace, usa la herramienta de busqueda web para abrir o localizar ese anuncio y extraer los datos del coche y su precio exacto anunciado.',
            'Si encuentras el precio exacto del anuncio, basePrice debe ser ese precio anunciado en euros. No inventes otro precio.',
            'basePrice debe ser el precio real del coche y debe ser mayor de 1000 euros. Si no encuentras el precio del coche, no inventes un valor pequeno como 1; explica el problema en assumptions.',
            'Responde siempre en espanol y devuelve solo JSON que cumpla el schema.',
            'No inventes datos especificos si faltan. Usa supuestos razonables y reflejalos en assumptions.',
            'Incluye filas para Impuesto de Matriculacion e Impuesto de Circulacion con importes estimados usando los datos del coche. El Impuesto de Matriculacion debe corresponder al calculo de dieselogasolina.com/calcular-impuesto-matriculacion-coche-moto-hacienda.html. El Impuesto de Circulacion debe corresponder al calculo de dieselogasolina.com/calcular-precio-impuesto-circulacion-ivtm.html.',
            'Incluye tambien las filas fijas Gestoria en Espana 250, ITV 200, Placas Alemanas y Seguro 250, Placas Espanolas 35, Gastos pasaje gasolina y peajes 700.',
            'La Comision de importacion depende del valor del coche: menor que 15000 es 1600, menor que 20000 es 1800, menor que 25000 es 2000, menor que 30000 es 2300, menor que 50000 es 2500, y 50000 o mas es 3000.',
            'Si la busqueda web no puede acceder al anuncio o no encuentra el precio exacto, dilo en assumptions y usa la descripcion del usuario solo si contiene un precio.',
            'Los importes deben ser numeros en euros, sin simbolos ni separadores.',
            'La estimacion no es una cotizacion final.',
          ].join(' '),
        },
        {
          role: 'user',
          content: [
            `Entrada del usuario: ${carContext.userText}`,
            carContext.sourceUrl
              ? `URL del anuncio que debes consultar con busqueda web: ${carContext.sourceUrl}`
              : '',
          ]
            .filter(Boolean)
            .join('\n\n'),
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'import_estimate',
          schema: estimateSchema,
          strict: true,
        },
      },
    })

    const estimate = normalizeEstimate(JSON.parse(response.output_text))

    return jsonResponse(estimate)
  } catch (error) {
    console.error(error)
    if (error instanceof EstimateInputError) {
      return jsonResponse({ error: error.message }, 422)
    }

    return jsonResponse({ error: 'Could not create estimate' }, 500)
  }
})
