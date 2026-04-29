import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '../components/ui/Icon'
import { SectionTitle } from '../components/ui/SectionTitle'
import { calculatorRows } from '../data/calculator'

const includedServices = [
  ['tax', 'Revisión del auto'],
  ['calendar', 'Importación'],
  ['tool', 'Pasar ITV'],
  ['itv', 'Matriculación'],
  ['truck', 'Entrega en casa'],
] as const

export function ImportPage() {
  return (
    <main className="px-[62px] py-[100px] sm:px-[78px] lg:px-[120px]">
      <SectionTitle>Importa tu coche soñado</SectionTitle>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-alabaster">
        Importamos el coche que buscas de manera segura desde Alemania.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-black">El servicio incluye:</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-5">
          {includedServices.map(([type, label]) => (
            <div
              className="rounded-md border border-white-smoke/10 bg-white-smoke/[0.03] p-5 text-center"
              key={label}
            >
              <div className="mx-auto grid h-12 w-12 place-items-center">
                <Icon type={type} />
              </div>
              <p className="mt-4 text-lg text-alabaster">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-black">Calcula el costo*</h2>
        <p className="mt-2 text-lg text-alabaster/70">
          *Este es un estimado, contáctenos para la cotización final
        </p>
        <label className="mt-6 block text-lg font-black" htmlFor="car-search">
          ¿Qué coche quieres importar?
        </label>
        <div className="mt-3 flex rounded-md border border-white-smoke/10 bg-white-smoke/[0.04] p-2">
          <input
            className="min-w-0 flex-1 bg-transparent px-4 text-lg text-white-smoke outline-none placeholder:text-alabaster/45"
            id="car-search"
            placeholder="Escribe marca, modelo, año o pega un enlace aquí..."
          />
          <button className="grid h-12 w-12 place-items-center rounded-md bg-brick-ember text-2xl font-black text-white">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-md border border-white-smoke/10">
          <table className="w-full min-w-[720px] border-collapse text-left text-lg">
            <thead className="bg-white-smoke/[0.04] text-lg uppercase text-white-smoke">
              <tr>
                <th className="border-r border-white-smoke/10 px-5 py-4">Concepto</th>
                <th className="border-r border-white-smoke/10 px-5 py-4">Detalle</th>
                <th className="px-5 py-4 text-right">Costo</th>
              </tr>
            </thead>
            <tbody>
              {calculatorRows.map(([concept, detail, cost]) => (
                <tr className="border-t border-white-smoke/10" key={concept}>
                  <td className="border-r border-white-smoke/10 px-5 py-4 font-medium">
                    {concept}
                  </td>
                  <td className="border-r border-white-smoke/10 px-5 py-4 text-alabaster">
                    {detail}
                  </td>
                  <td className="px-5 py-4 text-right font-black">€{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col items-end gap-3 text-right">
          <p className="text-lg font-black">
            SUBTOTAL SERVICIOS: <span className="ml-6">€4,630</span>
          </p>
          <p className="text-2xl font-black">
            PRECIO FINAL ESTIMADO: <span className="ml-6">€37,130</span>
          </p>
          <p className="text-lg text-alabaster/70">(asumiendo precio base €32,500)</p>
          <a
            className="mt-3 inline-flex min-w-64 justify-center rounded-md bg-brick-ember px-7 py-4 font-black text-white transition hover:bg-oxblood"
            href="#/cars"
          >
            Me interesa
          </a>
        </div>
      </section>
    </main>
  )
}
