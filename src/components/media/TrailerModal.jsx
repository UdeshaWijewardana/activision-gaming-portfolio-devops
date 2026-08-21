import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { FiExternalLink, FiX } from 'react-icons/fi'

/**
 * TrailerModal — Cinematic full-screen trailer viewer.
 * - Opens with fade + scale animation
 * - ESC key closes
 * - Click backdrop closes
 * - Scroll lock while open
 * - Focus trapped to close button on open
 * - Official YouTube embed only (no broken MP4 toggle)
 */
export default function TrailerModal({ isOpen, onClose, trailerId, title = 'Official Game Trailer' }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    // Focus the close button for keyboard users
    const timer = setTimeout(() => closeRef.current?.focus(), 100)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [isOpen, onClose])

  const id = trailerId || 'A-n_9kG220c'
  const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
  const directUrl = `https://www.youtube.com/watch?v=${id}`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="tm-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            className="tm-container"
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 8 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="tm-header">
              <div className="tm-header-left">
                <span className="tm-red-dot" aria-hidden="true" />
                <h3 className="tm-title">{title}</h3>
              </div>
              <div className="tm-header-right">
                <a
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tm-yt-link"
                  title="Open on YouTube"
                  aria-label="Open trailer on YouTube"
                >
                  <FiExternalLink aria-hidden="true" />
                  <span>YOUTUBE</span>
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  className="tm-close"
                  onClick={onClose}
                  aria-label="Close trailer"
                >
                  <FiX aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Video embed */}
            <div className="tm-body">
              <iframe
                src={embedUrl}
                title={title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="tm-iframe"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
