export function SectionTitle({ children }: { children: string }) {
  return (
    <div>
      <h1 className="text-4xl font-black leading-tight">{children}</h1>
      <div className="mt-3 h-0.5 w-12 bg-brick-ember" />
    </div>
  )
}
