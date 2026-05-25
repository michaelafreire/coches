import { useMemo, useState } from 'react'
import { CarGrid } from '../components/ui/CarGrid'
import { cars } from '../data/cars'
import type { Car } from '../types/car'

type CarPageProps = {
  car: Car
}

export function CarPage({ car }: CarPageProps) {
  const suggestions = cars.filter((item) => item.id !== car.id).slice(0, 3)
  const carName = `${car.marca} ${car.modelo}`
  const whatsappUrl = `https://wa.me/34675988250?text=${encodeURIComponent(
    `Hola, me interesa el ${carName}. ¿Me pueden dar más información?`,
  )}`
  const images = useMemo(() => [car.image, ...car.gallery].filter(Boolean), [car.gallery, car.image])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [galleryStart, setGalleryStart] = useState(0)
  const hasCarousel = images.length > 1
  const visibleGallery = useMemo(() => {
    if (images.length <= 3) {
      return images.map((image, imageIndex) => ({ image, imageIndex }))
    }

    return Array.from({ length: 3 }, (_, index) => {
      const imageIndex = (galleryStart + index) % images.length

      return {
        image: images[imageIndex],
        imageIndex,
      }
    })
  }, [galleryStart, images])
  const selectedImage = images[selectedImageIndex] ?? car.image

  function showPreviousImage() {
    setSelectedImageIndex((current) => {
      const nextIndex = current === 0 ? images.length - 1 : current - 1

      setGalleryStart(nextIndex)

      return nextIndex
    })
  }

  function showNextImage() {
    setSelectedImageIndex((current) => {
      const nextIndex = (current + 1) % images.length

      setGalleryStart(nextIndex)

      return nextIndex
    })
  }

  function selectImage(imageIndex: number) {
    setSelectedImageIndex(imageIndex)

    if (images.length > 3) {
      setGalleryStart(imageIndex)
    }
  }

  return (
    <main className="px-[62px] py-[100px] sm:px-[78px] lg:px-[120px]">
      <section className="grid gap-7 lg:grid-cols-[1.35fr_0.85fr]">
        <div>
          <div className="relative">
            <img
              alt={carName}
              className="aspect-[1.35] w-full rounded-md object-cover"
              src={selectedImage}
            />
            {hasCarousel && (
              <>
                <button
                  aria-label="Ver foto anterior"
                  className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-md border border-white-smoke/25 bg-night/55 text-3xl font-bold text-white-smoke transition hover:border-brick-ember hover:bg-night/75 hover:text-brick-ember"
                  onClick={showPreviousImage}
                  type="button"
                >
                  ‹
                </button>
                <button
                  aria-label="Ver foto siguiente"
                  className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-md border border-white-smoke/25 bg-night/55 text-3xl font-bold text-white-smoke transition hover:border-brick-ember hover:bg-night/75 hover:text-brick-ember"
                  onClick={showNextImage}
                  type="button"
                >
                  ›
                </button>
              </>
            )}
          </div>
          {images.length > 0 && (
            <div className="mt-4 flex items-center gap-3">
              <div className="grid flex-1 grid-cols-3 gap-3">
                {visibleGallery.map(({ image, imageIndex }) => (
                  <button
                    aria-label="Ver foto en grande"
                    className={`overflow-hidden rounded-md border transition ${
                      selectedImageIndex === imageIndex
                        ? 'border-brick-ember'
                        : 'border-white-smoke/10 hover:border-white-smoke/45'
                    }`}
                    key={image}
                    onClick={() => selectImage(imageIndex)}
                    type="button"
                  >
                    <img alt="" className="aspect-video w-full object-cover" src={image} />
                  </button>
                ))}
              </div>
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
            href={whatsappUrl}
            rel="noreferrer"
            target="_blank"
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
