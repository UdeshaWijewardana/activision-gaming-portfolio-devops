import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import MediaImage from './media/MediaImage'
import { media } from '../data/media'

export default function GameCard({ game, index = 0 }) {
  const reduced = useReducedMotion()
  return <motion.article className="game-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65, delay: index * .06 }} whileHover={reduced ? undefined : { y: -7 }}>
    <Link to={`/games/${game.slug}`} className={`game-art visual visual-${game.visual}`} aria-label={`Explore ${game.title}`} data-cursor="EXPLORE"><MediaImage src={media.visuals[game.visual]} alt="" /><span>{game.year}</span><b>EXPLORE</b></Link>
    <div className="game-card-copy"><p className="eyebrow">{game.category} / {game.platforms}</p><h3>{game.title}</h3><p>{game.description}</p><Link className="text-link" to={`/games/${game.slug}`}>VIEW EXPERIENCE <i>↗</i></Link></div>
  </motion.article>
}
