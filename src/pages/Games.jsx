import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import GameCard from '../components/GameCard'
import GameFilter from '../components/GameFilter'
import GameSearch from '../components/GameSearch'
import FeaturedMedia from '../components/FeaturedMedia'
import TrailerModal from '../components/media/TrailerModal'
import { filters, games, globalFeaturedMedia } from '../data/games'

export default function Games() {
  const [active, setActive] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentTrailerId, setCurrentTrailerId] = useState('A-n_9kG220c')
  const [currentTrailerTitle, setCurrentTrailerTitle] = useState('Official Game Trailer')
  const gridRef = useRef(null)

  const visible = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory = active === 'ALL' || game.category === active
      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        game.title.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [active, searchQuery])

  const openTrailer = (id, title) => {
    setCurrentTrailerId(id || 'A-n_9kG220c')
    setCurrentTrailerTitle(title || 'Official Game Trailer')
    setModalOpen(true)
  }

  const handleFilterSelect = (filter) => {
    setActive(filter)
  }

  const resetAll = () => {
    setActive('ALL')
    setSearchQuery('')
  }

  return (
    <main>
      {/* ══════════════════════════════════════════
          CINEMATIC HERO
      ══════════════════════════════════════════ */}
      <section className="gh-hero" aria-label="Games page hero">
        {/* Background — local asset, loads immediately */}
        <div
          className="gh-hero-bg"
          style={{ backgroundImage: "url('/media/hero/hero-poster.webp')" }}
          aria-hidden="true"
        />
        <div className="gh-hero-overlay" aria-hidden="true" />

        <div className="gh-hero-content">
          {/* Animated red accent line */}
          <motion.span
            className="gh-hero-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            aria-hidden="true"
          />

          <motion.p
            className="gh-hero-label eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ALL EXPERIENCES / 01
          </motion.p>

          <motion.h1
            className="gh-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            THE <em>GAMES</em>
          </motion.h1>

          <motion.p
            className="gh-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            ENTER WORLDS BUILT FOR THE NEXT GENERATION.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTROLS — FILTER + SEARCH
      ══════════════════════════════════════════ */}
      <section className="section-pad games-page">
        <div className="gh-controls">
          <GameFilter filters={filters} active={active} onSelect={handleFilterSelect} />
          <GameSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* ── Editorial game grid ── */}
        <div
          ref={gridRef}
          className={`game-grid-editorial${visible.length === 1 ? ' game-grid-single' : ''}`}
          style={{ marginTop: '32px' }}
        >
          {visible.map((game, index) => (
            <GameCard
              key={game.slug}
              game={game}
              index={index}
              onPlayTrailer={openTrailer}
            />
          ))}
        </div>

        {/* ── Empty state ── */}
        {!visible.length && (
          <motion.div
            className="gh-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            role="status"
            aria-live="polite"
          >
            <span className="gh-empty-icon" aria-hidden="true">◈</span>
            <h2>NO GAMES FOUND</h2>
            <p>No results match &ldquo;{searchQuery || active}&rdquo;. Try adjusting your search or filter.</p>
            <button
              type="button"
              className="button button-red"
              onClick={resetAll}
            >
              RESET FILTERS
            </button>
          </motion.div>
        )}
      </section>

      {/* ══════════════════════════════════════════
          FEATURED MEDIA SHOWCASE
      ══════════════════════════════════════════ */}
      <div className="section-pad" style={{ paddingTop: 0 }}>
        <FeaturedMedia items={globalFeaturedMedia} heading="FEATURED MEDIA" />
      </div>

      <TrailerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        trailerId={currentTrailerId}
        title={currentTrailerTitle}
      />
    </main>
  )
}
