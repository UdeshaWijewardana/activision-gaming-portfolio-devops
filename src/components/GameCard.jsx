import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPlay, FiArrowUpRight } from 'react-icons/fi'
import MediaImage from './media/MediaImage'
import { media } from '../data/media'

export default function GameCard({ game, index = 0, onPlayTrailer }) {

  // Image priority chain: game.image → media.visuals[game.visual] → local fallback
  const primarySrc = game.image || media.visuals[game.visual]
  const fallbackSrc = media.visuals[game.visual] || '/media/games/combat.webp'

  return (
    <motion.article
      className="game-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3), ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Art panel ── */}
      <div className={`game-art visual visual-${game.visual}`}>
        <MediaImage
          src={primarySrc}
          fallbackSrc={fallbackSrc}
          alt={game.title}
        />

        {/* Status + metacritic badges */}
        <div className="game-art-hud">
          {game.status && (
            <span className={`game-status-badge${game.status === 'LIVE' ? ' game-status-badge--live' : ''}`}>
              {game.status === 'LIVE' && <span className="game-status-dot" aria-hidden="true" />}
              {game.status}
            </span>
          )}
          {game.metacritic && (
            <span className="game-badge-score" title={`Metacritic: ${game.metacritic}/100`}>
              ★ {game.metacritic}
            </span>
          )}
        </div>

        {/* Action buttons — appear on hover */}
        <div className="game-art-actions">
          <Link
            to={`/games/${game.slug}`}
            className="game-art-btn btn-explore"
            aria-label={`View ${game.title}`}
          >
            VIEW GAME
          </Link>
          {onPlayTrailer && (
            <button
              type="button"
              className="game-art-btn btn-trailer"
              onClick={() => onPlayTrailer(game.trailerId, `${game.title} — Official Trailer`)}
              aria-label={`Watch ${game.title} trailer`}
              title="Watch Official Trailer"
            >
              <FiPlay aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Red accent line — slides in on hover via CSS */}
        <span className="game-card-red-line" aria-hidden="true" />
      </div>

      {/* ── Copy panel ── */}
      <div className="game-card-copy">
        <div className="game-card-tags">
          <span className="game-category-tag">{game.genre || game.category}</span>
          <span className="game-platform-tag">{game.platforms}</span>
        </div>
        <h3>
          <Link to={`/games/${game.slug}`}>{game.title}</Link>
        </h3>
        <p>{game.description}</p>
        <div className="game-card-footer">
          <Link className="text-link" to={`/games/${game.slug}`}>
            VIEW GAME <FiArrowUpRight aria-hidden="true" />
          </Link>
          <span className="game-year-tag">{game.year}</span>
        </div>
      </div>
    </motion.article>
  )
}
