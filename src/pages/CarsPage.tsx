import { CarGrid } from '../components/ui/CarGrid'
import { SectionTitle } from '../components/ui/SectionTitle'
import { cars } from '../data/cars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export function CarsPage() {
  return (
    <main className="px-[62px] py-[100px] sm:px-[78px] lg:px-[120px]">
      <SectionTitle>Nuestros coches</SectionTitle>

      <div className="mb-15 mt-7 px-0 sm:px-[110px]">
        <h2 className="text-lg font-black">Búsqueda rápida</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <select className="rounded-md border border-white-smoke/10 bg-white-smoke/[0.04] px-5 py-4 text-lg text-white-smoke outline-none">
            <option>Marca</option>
          </select>
          <select className="rounded-md border border-white-smoke/10 bg-white-smoke/[0.04] px-5 py-4 text-lg text-white-smoke outline-none">
            <option>Modelo</option>
          </select>
          <button className="grid h-12 w-12 place-items-center rounded-md bg-brick-ember text-2xl font-black text-white">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>

      <CarGrid className="mt-8" items={cars} />
    </main>
  )
}
