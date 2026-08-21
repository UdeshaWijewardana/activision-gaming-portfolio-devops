import { useState } from 'react'
import { FiPlay } from 'react-icons/fi'
import TrailerModal from './media/TrailerModal'

// YouTube thumbnail — maxresdefault with hqdefault fallback
const ytThumb = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
const ytThumbFallback = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`

const CATEGORY_COLORS = {
  TRAILER: '#e62534',
  GAMEPLAY: '#ffffff',
  CINEMATIC: '#ff6b77',
  'BEHIND THE GAME': '#aab0bb',
}

const CATEGORY_FILTERS = ['ALL', 'TRAILER', 'GAMEPLAY', 'CINEMATIC']

/**
 * FeaturedMedia — Showcase of trailers, gameplay clips, and cinematics.
 * Each card uses a YouTube thumbnail poster and opens TrailerModal on click.
 */
export default function FeaturedMedia({ items = [], heading = 'FEATURED MEDIA' }) {
  const [catFilter, setCatFilter] = useState('ALL')
  const [modalId, setModalId] = useState(null)
  const [modalTitle, setModalTitle] = useState('')

  const visible = catFilter === 'ALL'
    ? items
    : items.filter((item) => item.category === catFilter)

  const openTrailer = (id, title) => {
    setModalId(id)
    setModalTitle(title)
  }

  if (!items.length) return null

  return (
    <section className="fm-section" aria-label={heading}>
      <div className="fm-header">
        <p className="eyebrow">OFFICIAL MEDIA</p>
        <h2 className="fm-title">{heading}</h2>
        <div className="fm-filters" role="group" aria-label="Filter media by category">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`fm-filter-btn${catFilter === cat ? ' active' : ''}`}
              onClick={() => setCatFilter(cat)}
              aria-pressed={catFilter === cat}
            >
              {cat === 'ALL' ? 'ALL' : cat + 'S'}
            </button>
          ))}
        </div>
      </div>

      <div className="fm-grid">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            className="fm-card"
            onClick={() => openTrailer(item.id, item.title)}
            aria-label={`Play: ${item.title}`}
          >
            <div className="fm-thumb">
              <img
                src={ytThumb(item.id)}
                alt={item.title}
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.src = ytThumbFallback(item.id) }}
              />
              <div className="fm-thumb-overlay">
                <span
                  className="fm-play-btn"
                  style={{ borderColor: CATEGORY_COLORS[item.category] || '#e62534' }}
                  aria-hidden="true"
                >
                  <FiPlay />
                </span>
              </div>
              <span
                className="fm-cat-badge"
                style={{ color: CATEGORY_COLORS[item.category] || '#e62534' }}
              >
                {item.category}
              </span>
            </div>
            <p className="fm-card-title">{item.title}</p>
          </button>
        ))}
      </div>

      <TrailerModal
        isOpen={!!modalId}
        onClose={() => setModalId(null)}
        trailerId={modalId}
        title={modalTitle}
      />
    </section>
  )
}
