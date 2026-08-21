import { useEffect, useState } from 'react'

/**
 * MediaImage — resilient image component with fallback chain.
 * Primary src → fallbackSrc → hidden (never shows broken img element).
 */
export default function MediaImage({ src, fallbackSrc, alt, className = '', priority = false }) {
  const [imgSrc, setImgSrc] = useState(src)
  const [triedFallback, setTriedFallback] = useState(false)

  // Reset when src prop changes (e.g. navigating between game detail pages)
  useEffect(() => {
    setImgSrc(src)
    setTriedFallback(false)
  }, [src])

  const handleError = () => {
    if (!triedFallback && fallbackSrc && fallbackSrc !== imgSrc) {
      setImgSrc(fallbackSrc)
      setTriedFallback(true)
    } else {
      // Both failed — hide the element entirely
      setImgSrc(null)
    }
  }

  if (!imgSrc) return null

  return (
    <img
      className={`media-image ${className}`}
      src={imgSrc}
      alt={alt || ''}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={priority ? 'high' : 'auto'}
      onError={handleError}
    />
  )
}
