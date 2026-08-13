import { motion } from 'framer-motion'
import MediaImage from '../components/media/MediaImage'
import { media } from '../data/media'

export default function PageHero({ label, title, copy, visual = 'blackops', children }) {
  return <section className={`page-hero visual visual-${visual}`}><MediaImage src={media.visuals[visual]} alt="" priority /><div className="video-shade" /><motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}><p className="eyebrow">{label}</p><h1>{title}</h1>{copy && <p>{copy}</p>}{children}</motion.div><span className="hero-index">02 <span>/</span> 06</span></section>
}
