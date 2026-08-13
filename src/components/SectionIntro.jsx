import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerChildren } from '../utils/motion'

export default function SectionIntro({ eyebrow, title, copy, align = '' }) {
  const reduced = useReducedMotion()
  return <motion.div className={`section-intro ${align}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }} variants={reduced ? undefined : staggerChildren}>
    <motion.p className="eyebrow" variants={reduced ? undefined : fadeUp}>{eyebrow}</motion.p>
    <motion.h2 variants={reduced ? undefined : fadeUp}>{title}</motion.h2>
    {copy && <motion.p className="intro-copy" variants={reduced ? undefined : fadeUp}>{copy}</motion.p>}
  </motion.div>
}
