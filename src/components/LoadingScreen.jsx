import { motion } from 'framer-motion'

export default function LoadingScreen({ progress }) {
  return <motion.div className="loading-screen" exit={{ opacity: 0, transition: { duration: .5 } }} aria-live="polite" aria-label="Loading site">
    <div className="loading-mark">ACTIVISION<span> / STUDY</span></div>
    <div className="loader-copy"><span>INITIALIZING EXPERIENCE</span><strong>LOADING {String(progress).padStart(3, '0')}%</strong></div>
    <div className="loader-line"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
  </motion.div>
}
