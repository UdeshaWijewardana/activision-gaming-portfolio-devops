import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiExternalLink, FiX, FiFilm } from 'react-icons/fi'

export default function TrailerModal({ isOpen, onClose, trailerId, videoSrc, title = 'Official Game Trailer' }) {
  const [useDirect, setUseDirect] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const id = trailerId || 'A-n_9kG220c'
  const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
  const directUrl = `https://www.youtube.com/watch?v=${id}`
  const directVideo = videoSrc || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'

  return (
    <AnimatePresence>
      <motion.div
        className="trailer-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(5, 7, 12, 0.94)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <motion.div
          className="trailer-modal-container"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '1000px',
            position: 'relative',
            background: '#0d111a',
            border: '1px solid rgba(255, 42, 59, 0.35)',
            boxShadow: '0 25px 60px -10px rgba(255, 42, 59, 0.3), 0 0 40px rgba(0,0,0,0.8)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'linear-gradient(90deg, #121824 0%, #0b0f17 100%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff2a3b', boxShadow: '0 0 12px #ff2a3b' }} />
              <h3 style={{ margin: 0, fontSize: '17px', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: '0.08em', color: '#fff' }}>
                {title}
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setUseDirect(!useDirect)}
                title={useDirect ? "Switch to YouTube stream" : "Switch to Direct MP4 video stream"}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: useDirect ? 'rgba(230, 37, 52, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: useDirect ? '1px solid #e62534' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: useDirect ? '#fff' : '#9aa6b2',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  cursor: 'pointer'
                }}
              >
                <FiFilm />
                <span>{useDirect ? 'MP4 ACTIVE' : 'SWITCH STREAM'}</span>
              </button>
              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Watch directly on YouTube"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#9aa6b2',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>OPEN YOUTUBE</span>
                <FiExternalLink />
              </a>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close trailer"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  width: '34px',
                  height: '34px',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '18px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                }}
              >
                <FiX />
              </button>
            </div>
          </div>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000' }}>
            {useDirect ? (
              <video
                controls
                autoPlay
                playsInline
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              >
                <source src={directVideo} type="video/mp4" />
              </video>
            ) : (
              <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
