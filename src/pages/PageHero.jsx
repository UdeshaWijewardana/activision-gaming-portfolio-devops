import { motion } from 'framer-motion'
import MediaImage from '../components/media/MediaImage'
import { media } from '../data/media'

export default function PageHero({ label, title, copy, visual = 'blackops', children }) {
  return (
    <section className={`page-hero visual visual-${visual}`}>
      <MediaImage src={media.visuals[visual] || media.visuals.blackops} alt="" priority />
      <div className="video-shade" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
        {children}
      </motion.div>
    </section>
  )
}
