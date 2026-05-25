import { Logo } from '../ui/Logo'

type HeaderProps = {
  path: string
}

export function Header({ path }: HeaderProps) {
  return (
    <header className="flex min-h-28 items-center justify-between border-b border-white-smoke/10 px-[32px] py-2 sm:px-[55px] lg:px-[50px]">
      <Logo />

      <nav className="flex items-center gap-7 text-m font-medium">
        <NavLink active={path.startsWith('/cars')} href="#/cars">
          Nuestros coches
        </NavLink>
        <NavLink active={path === '/import'} href="#/import">
          Importa
        </NavLink>
      </nav>
    </header>
  )
}

function NavLink({
  active,
  children,
  href,
}: {
  active: boolean
  children: string
  href: string
}) {
  return (
    <a
      className={`relative py-2 text-white-smoke transition hover:text-white ${
        active ? 'after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-brick-ember' : ''
      }`}
      href={href}
    >
      {children}
    </a>
  )
}
