const whatsappUrl =
  'https://wa.me/34675988250?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20un%20coche.'

export function FloatingWhatsApp() {
  return (
    <a
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white-smoke focus:ring-offset-2 focus:ring-offset-night"
      href={whatsappUrl}
      rel="noreferrer"
      target="_blank"
      title="WhatsApp"
    >
      <span className="hidden rounded-md bg-white-smoke px-5 py-3 text-left text-sm leading-5 text-graphite shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:block">
        <span className="block font-medium">¿Necesitas ayuda?</span>
        <span className="block">Conversa con nosotros.</span>
      </span>
      <span className="grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition hover:scale-105 hover:bg-[#1ebe5d]">
        <svg aria-hidden="true" className="h-9 w-9" fill="currentColor" viewBox="0 0 32 32">
          <path d="M16.04 3.2A12.77 12.77 0 0 0 5.12 22.57L3.8 28.4l5.96-1.28A12.78 12.78 0 1 0 16.04 3.2Zm0 23.27a10.53 10.53 0 0 1-5.36-1.47l-.38-.22-3.53.76.78-3.43-.25-.4a10.54 10.54 0 1 1 8.74 4.76Zm5.78-7.9c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.72.16-.21.32-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.42 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.38.18-1.5-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </span>
    </a>
  )
}
