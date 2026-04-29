import { CarGrid } from '../components/ui/CarGrid'
import { cars } from '../data/cars'
import type { Car } from '../types/car'

type CarPageProps = {
  car: Car
}

export function CarPage({ car }: CarPageProps) {
  const suggestions = cars.filter((item) => item.id !== car.id).slice(0, 3)
  const carName = `${car.marca} ${car.modelo}`

  return (
    <main className="px-[62px] py-[100px] sm:px-[78px] lg:px-[120px]">
      <section className="grid gap-7 lg:grid-cols-[1.35fr_0.85fr]">
        <div>
          <img
            alt={carName}
            className="aspect-[1.35] w-full rounded-md object-cover"
            src={car.image}
          />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {car.gallery.map((image) => (
              <img
                alt=""
                className="aspect-video rounded-md object-cover"
                key={image}
                src={image}
              />
            ))}
          </div>
        </div>

        <aside className="py-3">
          <h1 className="text-3xl font-black">{carName}</h1>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-lg">
            {[
              ['Año', car.year],
              ['Kilometraje', car.kilometraje],
              ['Etiqueta medioambiental', car.etiquetaMedioambiental],
              ['Cilindrada', car.cilindrada],
              ['Transmisión', car.transmision],
              ['Motor', car.motor],
            ].map(([label, value]) => (
              <div className="contents" key={label}>
                <dt className="text-alabaster/70">{label}:</dt>
                <dd className="font-medium text-white-smoke">{value}</dd>
              </div>
            ))}
          </dl>
          <a
            className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-brick-ember px-6 py-4 text-lg font-black text-white transition hover:bg-oxblood"
            href="#/import"
          >
            Me interesa
          </a>
        </aside>
      </section>

      <section className="mt-30">
        <h2 className="text-3xl font-black">También te podría gustar</h2>
        <CarGrid className="mt-6" items={suggestions} />
      </section>
    </main>
  )
}
