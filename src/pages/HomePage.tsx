import { Icon } from '../components/ui/Icon'
import { HeroBanner } from '../components/ui/HeroBanner'
import { SectionTitle } from '../components/ui/SectionTitle'
import heroImage from '../assets/hero.png'
import { services } from '../data/services'

export function HomePage() {
  return (
    <main>
      <HeroBanner image={heroImage} />

      <section className="border-t border-white-smoke/10 px-[62px] py-[100px] sm:px-[78px] lg:px-[120px]">
        <SectionTitle>Nuestros Servicios</SectionTitle>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {services.map((service) => (
            <a
              className="group flex min-h-36 items-center justify-between rounded-md border border-white-smoke/10 bg-white-smoke/[0.03] p-8 transition hover:border-brick-ember/60 hover:bg-white-smoke/[0.06]"
              href={service.href}
              key={service.title}
            >
              <div>
                <Icon type={service.icon} />
                <h3 className="mt-5 text-2xl font-black leading-tight text-white-smoke">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-sm text-lg leading-8 text-alabaster/70">
                  {service.description}
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brick-ember text-xl font-black transition group-hover:translate-x-1">
                ›
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
