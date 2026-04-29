import { useEffect, useMemo, useState } from 'react'
import { CarGrid } from '../components/ui/CarGrid'
import { cars } from '../data/cars'
import type { Car } from '../types/car'

type CarPageProps = {
  car: Car
}

export function CarPage({ car }: CarPageProps) {
  const suggestions = cars.filter((item) => item.id !== car.id).slice(0, 3)
  const carName = `${car.marca} ${car.modelo}`
  const [selectedImage, setSelectedImage] = useState(car.image)
  const [galleryStart, setGalleryStart] = useState(0)
  const hasCarousel = car.gallery.length > 3
  const visibleGallery = useMemo(() => {
    if (car.gallery.length <= 3) return car.gallery

    return Array.from({ length: 3 }, (_, index) => car.gallery[(galleryStart + index) % car.gallery.length])
  }, [car.gallery, galleryStart])

  useEffect(() => {
    setSelectedImage(car.image)
    setGalleryStart(0)
  }, [car.id, car.image])

  function showPreviousImages() {
    setGalleryStart((current) => (current === 0 ? car.gallery.length - 1 : current - 1))
  }

  function showNextImages() {
    setGalleryStart((current) => (current + 1) % car.gallery.length)
  }

  return (
    <main className="px-[62px] py-[100px] sm:px-[78px] lg:px-[120px]">
      <section className="grid gap-7 lg:grid-cols-[1.35fr_0.85fr]">
        <div>
          <img
            alt={carName}
            className="aspect-[1.35] w-full rounded-md object-cover"
            src={selectedImage}
          />
          {car.gallery.length > 0 && (
            <div className="mt-4 flex items-center gap-3">
              {hasCarousel && (
                <button
                  aria-label="Ver fotos anteriores"
                  className="flex size-11 shrink-0 items-center justify-center rounded-md border border-white-smoke/15 text-2xl font-bold text-white-smoke transition hover:border-brick-ember hover:text-brick-ember"
                  onClick={showPreviousImages}
                  type="button"
                >
                  ‹
                </button>
              )}
              <div className="grid flex-1 grid-cols-3 gap-3">
                {visibleGallery.map((image) => (
                  <button
                    aria-label="Ver foto en grande"
                    className={`overflow-hidden rounded-md border transition ${
                      selectedImage === image
                        ? 'border-brick-ember'
                        : 'border-white-smoke/10 hover:border-white-smoke/45'
                    }`}
                    key={image}
                    onClick={() => setSelectedImage(image)}
                    type="button"
                  >
                    <img alt="" className="aspect-video w-full object-cover" src={image} />
                  </button>
                ))}
              </div>
              {hasCarousel && (
                <button
                  aria-label="Ver fotos siguientes"
                  className="flex size-11 shrink-0 items-center justify-center rounded-md border border-white-smoke/15 text-2xl font-bold text-white-smoke transition hover:border-brick-ember hover:text-brick-ember"
                  onClick={showNextImages}
                  type="button"
                >
                  ›
                </button>
              )}
            </div>
          )}
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
