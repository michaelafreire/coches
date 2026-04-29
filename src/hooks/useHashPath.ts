import { useEffect, useState } from 'react'

function getHashPath() {
  return window.location.hash.replace(/^#/, '') || '/'
}

export function useHashPath() {
  const [path, setPath] = useState(getHashPath)

  useEffect(() => {
    const handleHashChange = () => setPath(getHashPath())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return path
}
