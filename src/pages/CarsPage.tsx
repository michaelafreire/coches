import { useMemo, useState } from 'react'
import { CarGrid } from '../components/ui/CarGrid'
import { SectionTitle } from '../components/ui/SectionTitle'
import { cars } from '../data/cars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export function CarsPage() {
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const brands = useMemo(
    () => Array.from(new Set(cars.map((car) => car.marca))).sort(),
    [],
  )
  const models = useMemo(() => {
    const availableCars = selectedBrand
      ? cars.filter((car) => car.marca === selectedBrand)
      : cars

    return Array.from(new Set(availableCars.map((car) => car.modelo))).sort()
  }, [selectedBrand])
  const filteredCars = useMemo(
    () =>
      cars.filter((car) => {
        const matchesBrand = selectedBrand ? car.marca === selectedBrand : true
        const matchesModel = selectedModel ? car.modelo === selectedModel : true

        return matchesBrand && matchesModel
      }),
    [selectedBrand, selectedModel],
  )

  function handleBrandChange(brand: string) {
    setSelectedBrand(brand)
    setSelectedModel('')
  }

  return (
    <main className="px-[62px] py-[100px] sm:px-[78px] lg:px-[120px]">
      <SectionTitle>Nuestros coches</SectionTitle>

      <div className="mb-20 mt-10 px-0 sm:px-[110px]">
        <h2 className="text-lg font-black">Búsqueda rápida</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <div className="relative">
            <select
              className="w-full appearance-none rounded-md border border-white-smoke/10 bg-charcoal py-4 pl-5 pr-14 text-lg text-white-smoke outline-none"
              onChange={(event) => handleBrandChange(event.target.value)}
              value={selectedBrand}
            >
              <option value="">Marca</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-sm text-white-smoke"
              icon={faChevronDown}
            />
          </div>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-md border border-white-smoke/10 bg-charcoal py-4 pl-5 pr-14 text-lg text-white-smoke outline-none"
              onChange={(event) => setSelectedModel(event.target.value)}
              value={selectedModel}
            >
              <option value="">Modelo</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-sm text-white-smoke"
              icon={faChevronDown}
            />
          </div>
          <button
            aria-label="Buscar coches"
            className="grid h-12 w-12 place-items-center rounded-md bg-brick-ember text-2xl font-black text-white transition hover:bg-oxblood"
            type="button"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>

      <CarGrid className="mt-8" items={filteredCars} />
    </main>
  )
}
