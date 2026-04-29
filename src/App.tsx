import { useMemo } from 'react'
import { Header } from './components/layout/Header'
import { SiteFooter } from './components/layout/SiteFooter'
import { cars } from './data/cars'
import { useHashPath } from './hooks/useHashPath'
import { CarPage } from './pages/CarPage'
import { CarsPage } from './pages/CarsPage'
import { HomePage } from './pages/HomePage'
import { ImportPage } from './pages/ImportPage'

function App() {
  const path = useHashPath()

  const page = useMemo(() => {
    if (path === '/cars') return <CarsPage />
    if (path === '/import') return <ImportPage />

    const carMatch = path.match(/^\/cars\/(.+)$/)
    if (carMatch) {
      const car = cars.find((item) => item.id === carMatch[1])
      return <CarPage car={car ?? cars[0]} />
    }

    return <HomePage />
  }, [path])

  return (
    <div className="min-h-screen bg-[#090c0f] text-white-smoke">
      <Header path={path} />
      {page}
      <SiteFooter />
    </div>
  )
}

export default App
