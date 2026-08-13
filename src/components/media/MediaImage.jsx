import { useState } from 'react'

export default function MediaImage({ src, alt, className = '', priority = false }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return <img className={`media-image ${className}`} src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchpriority={priority ? 'high' : 'auto'} onError={() => setFailed(true)} />
}
