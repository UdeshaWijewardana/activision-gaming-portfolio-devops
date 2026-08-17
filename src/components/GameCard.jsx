import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { FiPlay, FiArrowUpRight } from 'react-icons/fi'
import MediaImage from './media/MediaImage'
import { media } from '../data/media'

export default function GameCard({ game, index = 0, onPlayTrailer }) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      className="game-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={reduced ? undefined : { y: -6 }}
    >
      <div className={`game-art visual visual-${game.visual}`}>
        <MediaImage src={media.visuals[game.visual] || media.visuals.cod} alt={game.title} />
        <div className="game-art-hud">
          <span className="game-badge-year">{game.year}</span>
          {game.metacritic && (
            <span className="game-badge-rating" title={`Metacritic Score: ${game.metacritic}`}>
              ★ {game.metacritic}
            </span>
          )}
        </div>
        <div className="game-art-actions">
          <Link to={`/games/${game.slug}`} className="game-art-btn btn-explore" aria-label={`Explore ${game.title}`}>
            EXPLORE
          </Link>
          {onPlayTrailer && (
            <button
              type="button"
              className="game-art-btn btn-trailer"
              onClick={() => onPlayTrailer(game.trailerId, `${game.title} Trailer`)}
              aria-label={`Play trailer for ${game.title}`}
              title="Watch Official Trailer"
            >
              <FiPlay />
            </button>
          )}
        </div>
      </div>
      <div className="game-card-copy">
        <div className="game-card-tags">
          <span className="game-category-tag">{game.category}</span>
          <span className="game-platform-tag">{game.platforms}</span>
        </div>
        <h3>
          <Link to={`/games/${game.slug}`}>{game.title}</Link>
        </h3>
        <p>{game.description}</p>
        <div className="game-card-footer">
          <Link className="text-link" to={`/games/${game.slug}`}>
            VIEW EXPERIENCE <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
