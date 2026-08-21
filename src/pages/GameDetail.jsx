import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiPlay, FiCheckCircle, FiMonitor } from 'react-icons/fi'
import { games } from '../data/games'
import { media } from '../data/media'
import NotFound from './NotFound'
import GameCard from '../components/GameCard'
import MediaImage from '../components/media/MediaImage'
import TrailerModal from '../components/media/TrailerModal'
import FeaturedMedia from '../components/FeaturedMedia'
import MediaGallery from '../components/MediaGallery'

// YouTube thumbnail helpers
const ytThumb = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
const ytThumbFallback = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`

/**
 * LazyTrailerEmbed — Click-to-reveal YouTube embed for performance.
 * Shows a thumbnail + play button until the user clicks.
 */
function LazyTrailerEmbed({ trailerId, title }) {
  const [active, setActive] = useState(false)
  const id = trailerId || 'A-n_9kG220c'
  const thumb = ytThumb(id)
  const thumbFallback = ytThumbFallback(id)

  if (!active) {
    return (
      <button
        type="button"
        className="lte-placeholder"
        onClick={() => setActive(true)}
        aria-label={`Play ${title} — Experience the Game`}
      >
        <img
          src={thumb}
          alt={`${title} gameplay thumbnail`}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.target.src = thumbFallback }}
        />
        <div className="lte-overlay">
          <span className="lte-play-btn" aria-hidden="true">
            <FiPlay />
          </span>
          <p className="lte-cta">WATCH GAMEPLAY</p>
        </div>
      </button>
    )
  }

  return (
    <div className="lte-active">
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        title={`${title} — Experience the Game`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="lte-iframe"
      />
    </div>
  )
}

export default function GameDetail() {
  const { slug } = useParams()
  const [trailerOpen, setTrailerOpen] = useState(false)

  const game = games.find((item) => item.slug === slug)
  if (!game) return <NotFound />

  const related = games.filter((item) => item.slug !== game.slug).slice(0, 3)

  // Build gallery images from the game's featured media thumbnails
  const galleryImages = (game.featuredMedia || []).map((item) => ({
    src: ytThumb(item.id),
    alt: item.title,
    caption: item.title,
    fallback: ytThumbFallback(item.id),
  }))

  // Hero image priority: game.heroImage → game.image → media.visuals fallback
  const heroPrimary = game.heroImage || game.image || media.visuals[game.visual]
  const heroFallback = game.image || media.visuals[game.visual] || '/media/hero/hero-poster.webp'

  return (
    <main>
      {/* ══════════════════════════════════════════
          FULL-SCREEN CINEMATIC HERO
      ══════════════════════════════════════════ */}
      <section className="dh-hero" aria-label={`${game.title} hero`}>
        {/* Cinematic background */}
        <MediaImage
          src={heroPrimary}
          fallbackSrc={heroFallback}
          alt={game.title}
          priority
        />
        <div className="dh-hero-overlay" aria-hidden="true" />

        {/* Red vertical accent */}
        <motion.span
          className="dh-accent-line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />

        {/* Back link */}
        <Link className="back-link" to="/games" aria-label="Back to all games">
          <FiArrowLeft aria-hidden="true" /> ALL GAMES
        </Link>

        {/* Hero content */}
        <div className="dh-hero-content">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {game.genre || game.category} // {game.year}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {game.title}
          </motion.h1>

          <motion.p
            className="dh-hero-tagline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6 }}
          >
            {game.tagline}
          </motion.p>

          <motion.div
            className="dh-hero-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <button
              type="button"
              className="button button-red"
              onClick={() => setTrailerOpen(true)}
              aria-label={`Watch ${game.title} official trailer`}
            >
              <FiPlay aria-hidden="true" /> WATCH TRAILER
            </button>
            {game.youtubeUrl && (
              <a
                href={game.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-ghost"
                aria-label={`Open ${game.title} trailer on YouTube`}
              >
                OPEN ON YOUTUBE
              </a>
            )}
          </motion.div>
        </div>

        {/* Play disc — bottom-right shortcut */}
        <button
          className="play-disc"
          onClick={() => setTrailerOpen(true)}
          aria-label={`Play ${game.title} official trailer`}
          title="Watch Official Trailer"
        >
          <FiPlay aria-hidden="true" />
        </button>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT THE GAME
      ══════════════════════════════════════════ */}
      <section className="detail-intro section-pad">
        <div>
          <p className="eyebrow">THE EXPERIENCE</p>
          <h2>ABOUT THE GAME</h2>
        </div>
        <div>
          <p className="dh-description">{game.description}</p>
          <div className="detail-meta">
            <span>
              <b>GENRE</b>
              {game.genre || game.category}
            </span>
            <span>
              <b>PLATFORMS</b>
              {game.platforms}
            </span>
            <span>
              <b>TIMELINE</b>
              {game.year}
            </span>
            <span>
              <b>RATING</b>
              {game.rating || 'M (17+)'}
            </span>
            {game.developer && (
              <span>
                <b>DEVELOPER</b>
                {game.developer}
              </span>
            )}
            {game.publisher && (
              <span>
                <b>PUBLISHER</b>
                {game.publisher}
              </span>
            )}
            {game.metacritic && (
              <span>
                <b>METACRITIC</b>
                {game.metacritic} / 100
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GAMEPLAY FEATURES
      ══════════════════════════════════════════ */}
      {game.features && game.features.length > 0 && (
        <section className="feature-list" aria-label="Gameplay features">
          {game.features.map((feature, index) => (
            <article key={feature}>
              <span aria-hidden="true">0{index + 1}</span>
              <h3>
                <FiCheckCircle
                  aria-hidden="true"
                  style={{ color: 'var(--accent-red)', marginRight: 8, verticalAlign: 'middle' }}
                />
                {feature}
              </h3>
              <p>Designed to deliver high tactile clarity, responsive player agency, and unmatched depth.</p>
            </article>
          ))}
        </section>
      )}

      {/* ══════════════════════════════════════════
          EXPERIENCE THE GAME — Lazy embed
      ══════════════════════════════════════════ */}
      {game.trailerId && (
        <section className="dh-trailer-section section-pad" aria-label="Experience the game">
          <p className="eyebrow">
            <FiMonitor aria-hidden="true" style={{ marginRight: 6, verticalAlign: 'middle' }} />
            GAMEPLAY
          </p>
          <h2 className="dh-trailer-heading">EXPERIENCE THE GAME</h2>
          <p className="dh-trailer-sub">
            Click to launch the official trailer. User-initiated playback — no autoplay.
          </p>
          <div className="dh-trailer-wrapper">
            <LazyTrailerEmbed trailerId={game.trailerId} title={game.title} />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          ENGINEERING PANEL
      ══════════════════════════════════════════ */}
      {game.technology && (
        <section className="tech-panel visual visual-blackops">
          <MediaImage
            src={media.visuals.blackops}
            fallbackSrc="/media/games/blackops.png"
            alt="Engine technology visual"
          />
          <div className="video-shade" aria-hidden="true" />
          <div>
            <p className="eyebrow">ENGINEERING &amp; PIPELINE</p>
            <h2>
              BUILT TO<br />
              <em>RESPOND.</em>
            </h2>
            <p>{game.technology}</p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          FEATURED MEDIA (game-specific)
      ══════════════════════════════════════════ */}
      {game.featuredMedia && game.featuredMedia.length > 0 && (
        <div className="section-pad" style={{ paddingBottom: 0 }}>
          <FeaturedMedia
            items={game.featuredMedia}
            heading={`${game.title} — MEDIA`}
          />
        </div>
      )}

      {/* ══════════════════════════════════════════
          MEDIA GALLERY
      ══════════════════════════════════════════ */}
      {galleryImages.length > 0 && (
        <div className="section-pad">
          <MediaGallery images={galleryImages} heading="MEDIA GALLERY" />
        </div>
      )}

      {/* ══════════════════════════════════════════
          RELATED GAMES
      ══════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="section-pad related">
          <p className="eyebrow">CONTINUE EXPLORING</p>
          <h2 style={{ marginBottom: '32px' }}>MORE FRANCHISES</h2>
          <div className="game-grid">
            {related.map((item, index) => (
              <GameCard
                key={item.slug}
                game={item}
                index={index}
                onPlayTrailer={() => setTrailerOpen(true)}
              />
            ))}
          </div>
        </section>
      )}

      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        trailerId={game.trailerId || 'A-n_9kG220c'}
        title={`${game.title} — Official Trailer`}
      />
    </main>
  )
}
