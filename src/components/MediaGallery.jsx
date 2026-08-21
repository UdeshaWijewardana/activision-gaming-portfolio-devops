import { useCallback, useEffect, useRef, useState } from 'react'
import { FiX, FiZoomIn } from 'react-icons/fi'

/**
 * MediaGallery — Responsive image gallery with lightbox.
 * images: [{ src, alt, caption }]
 * First image is featured (large), others are smaller thumbnails.
 */
export default function MediaGallery({ images = [], heading = 'MEDIA GALLERY' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const closeRef = useRef(null)

  const openLightbox = (index) => setLightboxIndex(index)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => setLightboxIndex((i) => (i + 1) % images.length), [images.length])
  const goPrev = useCallback(() => setLightboxIndex((i) => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  if (!images.length) return null

  const [featured, ...rest] = images

  return (
    <section className="mg-section" aria-label={heading}>
      <p className="eyebrow">GALLERY</p>
      <h2 className="mg-title">{heading}</h2>

      <div className="mg-grid">
        {/* Featured large image */}
        <button
          className="mg-item mg-item--featured"
          onClick={() => openLightbox(0)}
          aria-label={`View image: ${featured.alt || featured.caption || 'Gallery image 1'}`}
          type="button"
        >
          <img src={featured.src} alt={featured.alt || ''} loading="lazy" decoding="async" />
          <div className="mg-item-overlay">
            <FiZoomIn aria-hidden="true" />
          </div>
          {featured.caption && <span className="mg-caption">{featured.caption}</span>}
        </button>

        {/* Supporting images */}
        {rest.map((img, idx) => (
          <button
            key={img.src + idx}
            className="mg-item"
            onClick={() => openLightbox(idx + 1)}
            aria-label={`View image: ${img.alt || img.caption || `Gallery image ${idx + 2}`}`}
            type="button"
          >
            <img src={img.src} alt={img.alt || ''} loading="lazy" decoding="async" />
            <div className="mg-item-overlay">
              <FiZoomIn aria-hidden="true" />
            </div>
            {img.caption && <span className="mg-caption">{img.caption}</span>}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="mg-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={closeLightbox}
        >
          <div className="mg-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              className="mg-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              <FiX />
            </button>
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt || ''}
              className="mg-lightbox-img"
            />
            {images.length > 1 && (
              <div className="mg-lightbox-nav">
                <button type="button" onClick={goPrev} aria-label="Previous image">&#8592;</button>
                <span>{lightboxIndex + 1} / {images.length}</span>
                <button type="button" onClick={goNext} aria-label="Next image">&#8594;</button>
              </div>
            )}
            {images[lightboxIndex].caption && (
              <p className="mg-lightbox-caption">{images[lightboxIndex].caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
