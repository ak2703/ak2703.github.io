import { useState, useEffect } from 'react'
import { config } from './config.js'
import Desktop from './components/Desktop.jsx'
import MobilePortfolio from './components/MobilePortfolio.jsx'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])
  return matches
}

export default function App() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return isMobile
    ? <MobilePortfolio data={config} />
    : <Desktop data={config} />
}
