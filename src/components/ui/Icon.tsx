type IconProps = {
  type: string
}

export function Icon({ type }: IconProps) {
  const common = 'h-12 w-12 stroke-brick-ember'
  const white = 'h-12 w-12 stroke-white-smoke'

  if (type === 'car') {
    return (
      <svg className={common} fill="none" strokeWidth="1.8" viewBox="0 0 48 48">
        <path d="M9 28h30l-4-10H13L9 28Z" />
        <path d="M12 28v8m24-8v8M15 36h18" />
        <circle cx="16" cy="34" r="3" />
        <circle cx="32" cy="34" r="3" />
      </svg>
    )
  }

  if (type === 'ship') {
    return (
      <svg className={common} fill="none" strokeWidth="1.8" viewBox="0 0 48 48">
        <path d="M8 32h32l-5 8H13l-5-8Z" />
        <path d="M16 32V16h14l5 7v9M20 16v-5h8v5" />
        <path d="M18 23h4m5 0h4" />
      </svg>
    )
  }

  return (
    <svg className={white} fill="none" strokeWidth="1.7" viewBox="0 0 48 48">
      <rect height="28" rx="3" width="28" x="10" y="10" />
      <path d="M16 20h16M16 28h16M20 16v24M28 16v24" />
    </svg>
  )
}
