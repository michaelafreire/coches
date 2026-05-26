import { useMemo, useState, type FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { SectionTitle } from '../components/ui/SectionTitle'
import { calculatorRows } from '../data/calculator'
import entregaIcon from '../assets/entrega.png'
import importacionIcon from '../assets/importacion.png'
import matriculacionIcon from '../assets/matriculacion.png'
import pasarItvIcon from '../assets/pasarItv.png'
import revisionAutoIcon from '../assets/revisionAuto.png'

const includedServices = [
  [revisionAutoIcon, 'Revisión del auto'],
  [importacionIcon, 'Importación'],
  [pasarItvIcon, 'Pasar ITV'],
  [matriculacionIcon, 'Matriculación'],
  [entregaIcon, 'Entrega en casa'],
] as const

type EstimateRow = {
  concept: string
  detail: string
  cost: number
}

type ImportEstimate = {
  rows: EstimateRow[]
  basePrice: number
  carName: string
}

function parseEuroAmount(value: string) {
  return Number(value.replace(/\./g, '').replace(',', '.'))
}

function formatEuroAmount(value: number) {
  return new Intl.NumberFormat('es-ES', {
    currency: 'EUR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

async function createImportEstimate(carUrl: string): Promise<ImportEstimate> {
  const functionUrl = import.meta.env.VITE_IMPORT_ESTIMATE_FUNCTION_URL as string | undefined

  if (functionUrl) {
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
    const response = await fetch(functionUrl, {
      body: JSON.stringify({ car: carUrl }),
      headers: {
        'Content-Type': 'application/json',
        ...(supabaseAnonKey
          ? {
              Authorization: `Bearer ${supabaseAnonKey}`,
              apikey: supabaseAnonKey,
            }
          : {}),
      },
      method: 'POST',
    })

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null
      throw new Error(body?.error ?? 'No se pudo calcular la estimación')
    }

    return response.json()
  }

  await new Promise((resolve) => {
    window.setTimeout(resolve, 900)
  })

  return {
    basePrice: 32500,
    carName: carUrl,
    rows: calculatorRows.map(([concept, detail, cost]) => ({
      concept,
      detail,
      cost: parseEuroAmount(cost),
    })),
  }
}

export function ImportPage() {
  const [carPrompt, setCarPrompt] = useState('')
  const [estimate, setEstimate] = useState<ImportEstimate | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const subtotal = useMemo(
    () => estimate?.rows.reduce((total, row) => total + row.cost, 0) ?? 0,
    [estimate],
  )
  const tableRows = useMemo(
    () =>
      estimate
        ? [
            {
              concept: 'Precio del coche',
              detail: 'Precio anunciado por el vendedor antes de impuestos y gestión',
              cost: estimate.basePrice,
            },
            ...estimate.rows,
          ]
        : [],
    [estimate],
  )
  const finalPrice = estimate ? estimate.basePrice + subtotal : 0
  const quoteWhatsappUrl = estimate
    ? `https://wa.me/34675988250?text=${encodeURIComponent(
        [
          `Hola, me interesa esta cotización aproximada para importar: ${estimate.carName}.`,
          `Precio base: ${formatEuroAmount(estimate.basePrice)}.`,
          `Subtotal servicios: ${formatEuroAmount(subtotal)}.`,
          `Precio final estimado: ${formatEuroAmount(finalPrice)}.`,
          `Enlace del anuncio: ${carPrompt.trim()}`,
        ].join('\n'),
      )}`
    : ''

  async function handleEstimateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedPrompt = carPrompt.trim()

    if (!trimmedPrompt) {
      setEstimate(null)
      setError('Pega el enlace del anuncio para calcular el estimado.')
      return
    }

    if (!isValidUrl(trimmedPrompt)) {
      setEstimate(null)
      setError('Introduce un enlace válido del anuncio. Si aún no tienes uno, busca tu coche en mobile.de.')
      return
    }

    setIsLoading(true)
    setError('')
    setEstimate(null)

    try {
      setEstimate(await createImportEstimate(trimmedPrompt))
    } catch (estimateError) {
      setError(
        estimateError instanceof Error
          ? estimateError.message
          : 'No pudimos calcular el estimado ahora mismo. Inténtalo de nuevo.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="px-5 py-20 sm:px-10 sm:py-[100px] lg:px-[120px]">
      <SectionTitle>Importa tu coche soñado</SectionTitle>
      <p className="mt-5 text-lg leading-8 text-alabaster">
        Importamos tu próximo coche. De cualquier punto de Europa, con total garantía.
      </p>
      <p className="mt-8 text-lg leading-8 text-alabaster/80">
        En RT Premium Motors nos encargamos de todo el proceso para que disfrutes de tu
        vehículo sin preocupaciones. Te ayudamos a escoger la mejor unidad, la revisamos en
        origen y la traemos a España. Nos ocupamos de la ITV, los impuestos y todos los
        trámites necesarios para entregarte el coche totalmente registrado en España, con
        matrículas españolas y listo para conducir.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-black">El servicio incluye:</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-5">
          {includedServices.map(([icon, label]) => (
            <div
              className="rounded-md border border-white-smoke/10 bg-white-smoke/[0.03] p-5 text-center"
              key={label}
            >
              <img alt="" className="mx-auto h-36 w-36 object-contain" src={icon} />
              <p className="mt-4 text-lg text-alabaster">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-md border border-white-smoke/10 bg-white-smoke/[0.03] p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-3xl font-black tracking-normal md:text-4xl">Calcula el costo</p>
            <p className="mt-2 max-w-2xl text-base leading-7 text-alabaster/70 md:text-lg">
              Estimación orientativa para importar un coche desde Europa.
            </p>
          </div>
          <p className="max-w-sm text-sm leading-6 text-alabaster/55 lg:text-right">
            La cotización final puede variar según el anuncio y la documentación del vehículo.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="text-lg font-black" htmlFor="car-search">
            Enlace del anuncio
          </label>
          <a
            className="inline-flex w-fit items-center rounded-md border border-brick-ember/60 px-4 py-2 text-sm font-black text-white-smoke transition hover:border-brick-ember hover:bg-brick-ember/15"
            href="https://www.mobile.de/"
            rel="noreferrer"
            target="_blank"
          >
            Buscar en mobile.de
          </a>
        </div>
        <p className="mt-2 text-base leading-7 text-alabaster/65">
          Pega aquí el enlace del coche para calcular precio, impuestos y gastos de importación.
        </p>
        <form
          className="mt-4 flex rounded-md border border-white-smoke/10 bg-night/50 p-2 focus-within:border-brick-ember/70"
          onSubmit={handleEstimateSubmit}
        >
          <input
            className="min-h-14 min-w-0 flex-1 bg-transparent px-3 text-base text-white-smoke outline-none placeholder:text-alabaster/40 sm:px-4 md:text-lg"
            id="car-search"
            onChange={(event) => setCarPrompt(event.target.value)}
            placeholder="Pega aquí el enlace del anuncio..."
            type="url"
            value={carPrompt}
          />
          <button
            aria-label="Calcular estimado"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-brick-ember text-xl font-black text-white transition hover:bg-oxblood disabled:cursor-not-allowed disabled:bg-graphite sm:text-2xl"
            disabled={isLoading}
            type="submit"
          >
            <FontAwesomeIcon
              className={isLoading ? 'animate-spin' : ''}
              icon={isLoading ? faSpinner : faArrowUp}
            />
          </button>
        </form>

        {isLoading && (
          <div className="mt-6 flex items-center gap-3 text-lg text-alabaster">
            <FontAwesomeIcon className="animate-spin text-brick-ember" icon={faSpinner} />
            Calculando estimado...
          </div>
        )}

        {error && <p className="mt-4 text-lg text-brick-ember">{error}</p>}

        {estimate && (
          <>
            <div className="mt-6 rounded-md border border-white-smoke/10 bg-white-smoke/[0.04] px-4 py-4 sm:px-5">
              <p className="text-sm font-black uppercase tracking-[0.12em] text-alabaster/65">
                Coche calculado
              </p>
              <h3 className="mt-1 text-2xl font-black text-white-smoke [overflow-wrap:anywhere]">
                {estimate.carName}
              </h3>
            </div>

            <div className="mt-6 grid gap-3 md:hidden">
              {tableRows.map(({ concept, cost, detail }) => (
                <article
                  className="rounded-md border border-white-smoke/10 bg-white-smoke/[0.03] p-4"
                  key={concept}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-base font-black text-white-smoke">{concept}</h4>
                    <p className="shrink-0 text-base font-black text-white-smoke">
                      {formatEuroAmount(cost)}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-alabaster/75">{detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 hidden overflow-hidden rounded-md border border-white-smoke/10 md:block">
              <table className="w-full border-collapse text-left text-lg">
                <thead className="bg-white-smoke/[0.04] text-lg uppercase text-white-smoke">
                  <tr>
                    <th className="border-r border-white-smoke/10 px-5 py-4">Concepto</th>
                    <th className="border-r border-white-smoke/10 px-5 py-4">Detalle</th>
                    <th className="px-5 py-4 text-right">Costo</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map(({ concept, cost, detail }) => (
                    <tr className="border-t border-white-smoke/10" key={concept}>
                      <td className="border-r border-white-smoke/10 px-5 py-4 font-medium">
                        {concept}
                      </td>
                      <td className="border-r border-white-smoke/10 px-5 py-4 text-alabaster">
                        {detail}
                      </td>
                      <td className="px-5 py-4 text-right font-black">
                        {formatEuroAmount(cost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-3 text-right sm:items-end">
              <p className="text-base font-black sm:text-lg">
                SUBTOTAL SERVICIOS:{' '}
                <span className="block sm:ml-6 sm:inline">{formatEuroAmount(subtotal)}</span>
              </p>
              <p className="text-xl font-black sm:text-2xl">
                PRECIO FINAL ESTIMADO:{' '}
                <span className="block sm:ml-6 sm:inline">{formatEuroAmount(finalPrice)}</span>
              </p>
              <p className="text-lg text-alabaster/70">
                (asumiendo precio base {formatEuroAmount(estimate.basePrice)})
              </p>
              <a
                className="mt-3 inline-flex w-full justify-center rounded-md bg-brick-ember px-7 py-4 font-black text-white transition hover:bg-oxblood sm:w-auto sm:min-w-64"
                href={quoteWhatsappUrl}
                rel="noreferrer"
                target="_blank"
              >
                Me interesa
              </a>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
