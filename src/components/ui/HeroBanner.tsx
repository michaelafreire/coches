import { useState, type CSSProperties, type PointerEvent } from 'react'
import heroLogo from '../../assets/hero-logo.png'

type HeroBannerProps = {
  image: string
}

export function HeroBanner({ image }: HeroBannerProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    setOffset({
      x: Number((x * 22).toFixed(2)),
      y: Number((y * 14).toFixed(2)),
    })
  }

  const backgroundStyle: CSSProperties = {
    transform: `translate3d(${-offset.x * 0.16}px, ${-offset.y * 0.1}px, 0) scale(1.06)`,
  }

  const carStyle: CSSProperties = {
    transform: `translate3d(${offset.x * 1.1}px, ${offset.y * 0.8}px, 0) scale(1.08)`,
    WebkitMaskImage:
      'radial-gradient(ellipse 82% 72% at 68% 58%, black 0%, black 58%, transparent 80%)',
    maskImage:
      'radial-gradient(ellipse 82% 72% at 68% 58%, black 0%, black 58%, transparent 80%)',
  }

  return (
    <section
      className="relative isolate min-h-[520px] overflow-hidden bg-black sm:h-[75svh]"
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      onPointerMove={handlePointerMove}
    >
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover brightness-[0.58] saturate-[0.75] blur-[1px] transition-transform duration-300 ease-out"
        src={image}
        style={backgroundStyle}
      />
      <img
        alt=""
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover brightness-110 contrast-115 saturate-105 drop-shadow-[0_30px_40px_rgba(0,0,0,0.7)] transition-transform duration-200 ease-out"
        src={image}
        style={carStyle}
      />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/80 via-black/40 to-black/0" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#090c0f] to-transparent" />

      <div className="relative z-30 flex min-h-[520px] max-w-2xl flex-col justify-center px-7 py-16 sm:h-[75svh] sm:px-12">
        <h1>
          <span className="sr-only">RT Premium Motors</span>
          <img
            alt=""
            className="h-auto w-40 max-w-[56vw] object-contain sm:w-[230px]"
            height="420"
            src={heroLogo}
            width="782"
          />
        </h1>
        <p className="mt-8 max-w-xs text-lg leading-7 text-alabaster">
          15+ años de experiencia en el sector automovilístico.
        </p>
      </div>
    </section>
  )
}
