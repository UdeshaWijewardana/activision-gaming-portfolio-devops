import { useEffect, useRef, useState } from 'react'
import { media } from '../../data/media'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function useMobileMedia() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return mobile
}

export default function VideoHero({ className = '', children, useVideo = true }) {
  const videoRef = useRef(null)
  const reduced = useReducedMotion()
  const mobile = useMobileMedia()
  const [videoFailed, setVideoFailed] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)

  const shouldAttemptVideo = useVideo && !reduced && !mobile && !videoFailed

  useEffect(() => {
    if (!shouldAttemptVideo || !videoRef.current) return undefined
    const playAttempt = videoRef.current.play()
    if (playAttempt) playAttempt.catch(() => setVideoFailed(true))
    return undefined
  }, [shouldAttemptVideo])

  return (
    <div className={`video-hero visual visual-warzone ${posterFailed ? 'media-fallback' : ''} ${className}`}>
      {!posterFailed && (
        <picture className="hero-poster">
          <source media="(max-width: 767px)" srcSet={media.hero.poster} />
          <img src={media.hero.poster} alt="" aria-hidden="true" fetchpriority="high" decoding="async" onError={() => setPosterFailed(true)} />
        </picture>
      )}
      {shouldAttemptVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={media.hero.poster}
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
        >
          <source src={media.hero.videoMp4} type="video/mp4" />
          <source src={media.hero.videoWebm} type="video/webm" />
          {media.hero.fallbackMp4 && <source src={media.hero.fallbackMp4} type="video/mp4" />}
        </video>
      )}
      <div className="video-shade" />
      {children}
    </div>
  )
}

export function VideoSection({ visual = 'blackops', image, children }) {
  return (
    <div className={`video-section visual visual-${visual}`}>
      <img className="media-image" src={image || media.visuals[visual]} alt="" loading="lazy" decoding="async" />
      <div className="video-shade" />
      {children}
    </div>
  )
}
