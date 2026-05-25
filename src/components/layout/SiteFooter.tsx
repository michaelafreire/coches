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
            Importación y selección de coches premium con estética sobria,
            atención directa y gestión completa.
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
          <p>Barcelona, España</p>
          <p>+34 675 98 82 50</p>
          <p>info@rtpremiumcars.com</p>
        </FooterColumn>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-white-smoke/10 pt-5 text-lg text-alabaster/70 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 RT Premium Cars.</p>
        <p>Importa tu coche soñado.</p>
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
