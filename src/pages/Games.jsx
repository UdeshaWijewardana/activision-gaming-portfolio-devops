import { useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import PageHero from './PageHero'
import GameCard from '../components/GameCard'
import TrailerModal from '../components/media/TrailerModal'
import { filters, games } from '../data/games'

export default function Games() {
  const [active, setActive] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentTrailerId, setCurrentTrailerId] = useState('A-n_9kG220c')
  const [currentTrailerTitle, setCurrentTrailerTitle] = useState('Official Game Trailer')

  const visible = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory = active === 'ALL' || game.category.toUpperCase() === active.toUpperCase()
      const matchesSearch =
        searchQuery.trim() === '' ||
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [active, searchQuery])

  const openTrailer = (id, title) => {
    setCurrentTrailerId(id || 'A-n_9kG220c')
    setCurrentTrailerTitle(title || 'Official Game Trailer')
    setModalOpen(true)
  }

  return (
    <main>
      <PageHero
        label="ALL EXPERIENCES / 01"
        title={
          <>
            WORLD-<em>BUILDING.</em>
          </>
        }
        copy="Explore our portfolio of blockbuster franchises, groundbreaking combat systems, and rich interactive worlds."
        visual="warzone"
      />
      <section className="section-pad games-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
          <div className="filter-bar" style={{ margin: 0, padding: 0, border: 'none' }} aria-label="Game category filters">
            {filters.map((filter) => (
              <button
                className={active === filter ? 'active' : ''}
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={active === filter}
              >
                {filter}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search franchises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontFamily: 'inherit',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>
        <div className="game-grid all-games" style={{ marginTop: '32px' }}>
          {visible.map((game, index) => (
            <GameCard key={game.slug} game={game} index={index} onPlayTrailer={openTrailer} />
          ))}
        </div>
        {!visible.length && (
          <div className="empty-state">
            <p>No game franchises match your filter or search query.</p>
            <button className="button button-outline-sm" type="button" onClick={() => { setActive('ALL'); setSearchQuery('') }}>
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <TrailerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} trailerId={currentTrailerId} title={currentTrailerTitle} />
    </main>
  )
}
