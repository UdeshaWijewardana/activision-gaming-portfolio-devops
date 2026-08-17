import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiPlay, FiCheckCircle } from 'react-icons/fi'
import { games } from '../data/games'
import NotFound from './NotFound'
import GameCard from '../components/GameCard'
import MediaImage from '../components/media/MediaImage'
import TrailerModal from '../components/media/TrailerModal'
import { media } from '../data/media'

export default function GameDetail() {
  const { slug } = useParams()
  const [trailerOpen, setTrailerOpen] = useState(false)

  // Find game or fallback to alias (such as 'call-of-duty')
  const game = games.find((item) => item.slug === slug) ||
    (slug === 'call-of-duty' ? games.find((item) => item.slug === 'call-of-duty-mw3' || item.slug === 'black-ops-6') : undefined)

  if (!game) return <NotFound />
  const related = games.filter((item) => item.slug !== game.slug).slice(0, 3)

  return (
    <main>
      <section className={`detail-hero visual visual-${game.visual}`}>
        <MediaImage src={media.visuals[game.visual] || media.visuals.cod} alt={game.title} priority />
        <div className="video-shade" />
        <Link className="back-link" to="/games">
          <FiArrowLeft /> ALL GAMES
        </Link>
        <div>
          <p className="eyebrow">{game.category} // {game.year}</p>
          <h1>{game.title}</h1>
          <p>{game.tagline}</p>
        </div>
        <button
          className="play-disc"
          onClick={() => setTrailerOpen(true)}
          aria-label={`Play ${game.title} official trailer`}
          title="Watch Official 4K Trailer"
        >
          <FiPlay />
        </button>
      </section>

      <section className="detail-intro section-pad">
        <p className="eyebrow">THE EXPERIENCE</p>
        <div>
          <h2>{game.description}</h2>
          <div className="detail-meta">
            <span>
              <b>GENRE</b>
              {game.category}
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
              <b>AGE RATING</b>
              {game.rating || 'M (17+)'}
            </span>
            {game.metacritic && (
              <span>
                <b>METACRITIC SCORE</b>
                {game.metacritic} / 100
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="feature-list">
        {game.features.map((feature, index) => (
          <article key={feature}>
            <span>0{index + 1}</span>
            <h3>{feature}</h3>
            <p>Designed to deliver high tactile clarity, responsive player agency, and unmatched depth.</p>
          </article>
        ))}
      </section>

      <section className="tech-panel visual visual-blackops">
        <MediaImage src={media.visuals.engineTech || media.visuals.blackops} alt="Engine response tech visual" />
        <div className="video-shade" />
        <div>
          <p className="eyebrow">ENGINEERING & PIPELINE</p>
          <h2>
            BUILT TO<br />
            <em>RESPOND.</em>
          </h2>
          <p>{game.technology}</p>
        </div>
      </section>

      <section className="section-pad related">
        <p className="eyebrow">CONTINUE EXPLORING</p>
        <h2 style={{ marginBottom: '32px' }}>MORE FRANCHISES</h2>
        <div className="game-grid">
          {related.map((item, index) => (
            <GameCard game={item} key={item.slug} index={index} onPlayTrailer={() => { setTrailerOpen(true) }} />
          ))}
        </div>
      </section>

      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        trailerId={game.trailerId || 'A-n_9kG220c'}
        title={`${game.title} — Official Gameplay Trailer`}
      />
    </main>
  )
}
