import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import footerLogo from '../../assets/hero-logo.png'

export function SiteFooter() {
  return (
    <footer className="border-t border-white-smoke/10 bg-night px-[62px] py-[80px] sm:px-[78px] lg:px-[120px]">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a aria-label="Home" className="inline-flex" href="#/">
            <img
              alt="RT Premium Motors"
              className="h-auto w-28 object-contain"
              height="214"
              src={footerLogo}
              width="400"
            />
          </a>
          <p className="mt-5 max-w-md text-lg leading-8 text-alabaster">
          </p>
        </div>

        <FooterColumn title="Navegación">
          <a className="transition hover:text-brick-ember" href="#/">
            Home
          </a>
          <a className="transition hover:text-brick-ember" href="#/cars">
            Nuestros coches
          </a>
          <a className="transition hover:text-brick-ember" href="#/import">
            Importa
          </a>
        </FooterColumn>

        <FooterColumn title="Contacto">
          <ContactItem icon={faLocationDot}>Barcelona, España</ContactItem>
          <ContactItem icon={faPhone}>+34 675 98 82 50</ContactItem>
          <ContactItem icon={faEnvelope}>info@rtpremiumcars.com</ContactItem>
        </FooterColumn>
      </div>

      <div className="mt-10 border-t border-white-smoke/10 pt-5 text-center text-lg leading-7 text-alabaster/80">
        <p>Profesionalidad. Transparencia. Confianza.</p>
        <p className="font-black text-brick-ember">RT Premium Motors.</p>
      </div>
    </footer>
  )
}

function FooterColumn({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <div>
      <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white-smoke">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-3 text-lg text-alabaster">{children}</div>
    </div>
  )
}

function ContactItem({
  children,
  icon,
}: {
  children: React.ReactNode
  icon: IconDefinition
}) {
  return (
    <p className="flex items-center gap-4">
      <FontAwesomeIcon className="w-5 shrink-0 text-brick-ember" icon={icon} />
      <span>{children}</span>
    </p>
  )
}
