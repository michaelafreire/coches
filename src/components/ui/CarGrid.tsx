import type { Car } from '../../types/car'

type CarGridProps = {
  items: Car[]
  className?: string
}

export function CarGrid({ items, className = '' }: CarGridProps) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map((car) => (
        <CarCard car={car} key={car.id} />
      ))}
    </div>
  )
}

function CarCard({ car }: { car: Car }) {
  return (
    <a
      className="group overflow-hidden rounded-md border border-white-smoke/10 bg-white-smoke/[0.03] transition hover:border-brick-ember/70 hover:bg-white-smoke/[0.06]"
      href={`#/cars/${car.id}`}
    >
      <img
        alt={car.name}
        className="aspect-[1.55] w-full object-cover transition duration-500 group-hover:scale-105"
        src={car.image}
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-black">{car.name}</h3>
            <p className="mt-1 text-lg text-alabaster/55 line-through">€ {car.oldPrice}</p>
          </div>
          <p className="whitespace-nowrap text-lg font-bold">€ {car.price}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-lg text-alabaster">
          <Spec icon="▣" value={car.year} />
          <Spec icon="⌁" value={car.mileage} />
          <Spec icon="▤" value={car.fuel} />
          <Spec icon="⚙" value={car.gearbox} />
        </div>
      </div>
    </a>
  )
}

function Spec({ icon, value }: { icon: string; value: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="text-alabaster/55">{icon}</span>
      {value}
    </span>
  )
}
