import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { media } from '../../data/media'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const videoClips = [
  { url: media.hero.videoMp4, poster: media.hero.poster, label: 'Action & Combat Systems' },
  { url: media.hero.fallbackMp4, poster: media.visuals.warzone, label: 'Squad & Tactical Warfare' },
  { url: media.trailers.diablo, poster: media.visuals.diablo, label: 'Dark World Exploration' },
]

export default function HeroMediaSlider() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return undefined
    const interval = window.setInterval(() => setActive((current) => (current + 1) % videoClips.length), 9000)
    return () => window.clearInterval(interval)
  }, [reduced])

  const current = videoClips[active]

  return (
    <div className="hero-media-slider" aria-label="Studio cinematic background showcase">
      <img className="hero-slider-fallback" src={current.poster || media.hero.poster} alt="" aria-hidden="true" fetchpriority="high" />
      <AnimatePresence mode="wait">
        {!reduced && (
          <motion.video
            key={current.url}
            className="hero-slider-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={current.poster}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <source src={current.url} type="video/mp4" />
          </motion.video>
        )}
      </AnimatePresence>
      <div className="hero-slider-status" aria-hidden="true">
        <span>0{active + 1}</span>
        <i />
        <small>0{videoClips.length}</small>
      </div>
    </div>
  )
}
