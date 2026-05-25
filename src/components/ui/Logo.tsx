import logoImage from '../../assets/logo.png'

export function Logo() {
  return (
    <a
      aria-label="Home"
      className="inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full"
      href="#/"
    >
      <img
        alt="RT Premium Motors"
        className="h-full w-full object-contain"
        height="96"
        src={logoImage}
        width="96"
      />
    </a>
  )
}
