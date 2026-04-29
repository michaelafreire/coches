import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCalendar, faCar, faGear, faHockeyPuck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  const carName = `${car.marca} ${car.modelo}`

  return (
    <a
      className="group overflow-hidden rounded-md border border-white-smoke/10 bg-white-smoke/[0.03] transition hover:border-brick-ember/70 hover:bg-white-smoke/[0.06]"
      href={`#/cars/${car.id}`}
    >
      <img
        alt={carName}
        className="aspect-[1.55] w-full object-cover transition duration-500 group-hover:scale-105"
        src={car.image}
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-black">{carName}</h3>
            <p className="mt-1 text-lg text-alabaster/55">{car.etiquetaMedioambiental}</p>
          </div>
          <p className="whitespace-nowrap text-lg font-bold">€ {car.precio}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-m text-alabaster">
          <Spec icon={faCalendar} value={car.year} />
          <Spec icon={faCar} value={car.kilometraje} />
          <Spec icon={faHockeyPuck} value={`${car.cilindrada} cilindros`} />
          <Spec icon={faGear} value={car.transmision} />
        </div>
      </div>
    </a>
  )
}

function Spec({ icon, value }: { icon: IconDefinition | string; value: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="w-5 text-alabaster/55">
        {typeof icon === 'string' ? icon : <FontAwesomeIcon icon={icon} />}
      </span>
      {value}
    </span>
  )
}
