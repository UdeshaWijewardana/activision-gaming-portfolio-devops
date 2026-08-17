import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowDownRight, FiPlay, FiExternalLink } from 'react-icons/fi'
import { useState, useRef, useEffect } from 'react'
import VideoHero from '../components/media/VideoHero'
import HeroMediaSlider from '../components/media/HeroMediaSlider'
import GameCard from '../components/GameCard'
import MediaImage from '../components/media/MediaImage'
import TrailerModal from '../components/media/TrailerModal'
import { games } from '../data/games'
import { media } from '../data/media'

const trailerChapters = [
  {
    number: '01',
    title: 'BLACK OPS 6',
    copy: 'Forced to go rogue. A mind-bending spy thriller with Omnimovement.',
    videoSrc: media.trailers.blackops,
    poster: media.visuals.blackops,
    youtubeId: 'A-n_9kG220c'
  },
  {
    number: '02',
    title: 'WARZONE',
    copy: 'Tactical squad combat, massive scale, and high-intensity battle royale.',
    videoSrc: media.trailers.warzone,
    poster: media.visuals.warzone,
    youtubeId: '0E44Jwkl1L4'
  },
  {
    number: '03',
    title: 'DIABLO IV',
    copy: 'Grim gothic atmosphere, shared dark open world, and endless combat mastery.',
    videoSrc: media.trailers.diablo,
    poster: media.visuals.diablo,
    youtubeId: '0SSYzl9fXOQ'
  },
  {
    number: '04',
    title: 'SEKIRO',
    copy: 'Precision posture-deflection swordplay in mythical Sengoku Japan.',
    videoSrc: media.trailers.sekiro,
    poster: media.visuals.sekiro,
    youtubeId: '7Po7INInqzE'
  },
  {
    number: '05',
    title: 'TONY HAWK',
    copy: 'Legendary flow, iconic skate parks, and high-velocity trick combos.',
    videoSrc: media.trailers.hawk,
    poster: media.visuals.hawk,
    youtubeId: '1F9Y_Z6n9-4'
  },
]

const stats = [
  ['9+', 'ICONIC FRANCHISES'],
  ['120M+', 'ACTIVE PLAYERS'],
  ['25+', 'YEARS OF CRAFT'],
  ['4K', 'ULTRA-HD TRAILERS'],
]

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentTrailerId, setCurrentTrailerId] = useState('A-n_9kG220c')
  const [currentTrailerTitle, setCurrentTrailerTitle] = useState('Call of Duty: Black Ops 6 Trailer')
  const videoRef = useRef(null)

  const chapter = trailerChapters[activeChapter]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      const playPromise = videoRef.current.play()
      if (playPromise) playPromise.catch(() => {})
    }
  }, [activeChapter])

  const openTrailer = (id, title) => {
    setCurrentTrailerId(id || 'A-n_9kG220c')
    setCurrentTrailerTitle(title || 'Official Game Trailer')
    setModalOpen(true)
  }

  return (
    <main className="home-page">
      <VideoHero className="home-hero home-hero-redesign" useVideo={true}>
        <HeroMediaSlider />
        <div className="hero-hud" aria-hidden="true">
          <span className="hud-badge-dot" />
          <span>AAA STUDIO SHOWCASE // 2026</span>
        </div>
        <motion.div
          className="hero-content hero-content-redesign"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
        >
          <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
            THE NEXT GENERATION OF IMMERSIVE GAMING
          </motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>
            GAME<br />
            <em>ON.</em>
          </motion.h1>
          <motion.p className="hero-copy" variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            Pioneering cinematic storytelling, responsive combat systems, and breathtaking worlds built for players worldwide.
          </motion.p>
          <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <Link className="button button-red" to="/games">
              EXPLORE GAMES <FiArrowDownRight />
            </Link>
            <button className="button button-ghost" type="button" onClick={() => openTrailer(chapter.youtubeId, `${chapter.title} 4K Trailer`)}>
              <FiPlay /> WATCH 4K SHOWREEL
            </button>
          </motion.div>
        </motion.div>
        <div className="hero-scroll">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </VideoHero>

      {/* Featured Games Grid */}
      <section className="home-featured section-pad" aria-labelledby="featured-title">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">FEATURED EXPERIENCES</p>
            <h2 id="featured-title">
              ICONIC<br />
              <em>WORLDS.</em>
            </h2>
          </div>
          <p>Explore world-class blockbuster franchises engineered for high-octane competitive adrenaline and unforgettable cinematic moments.</p>
        </div>
        <div className="home-game-grid">
          {games.slice(0, 3).map((game, index) => (
            <GameCard key={game.slug} game={game} index={index} onPlayTrailer={openTrailer} />
          ))}
        </div>
        <Link className="text-link home-all-games" to="/games">
          VIEW ALL FRANCHISES <i>↗</i>
        </Link>
      </section>

      {/* Interactive Trailer Cinema Hub */}
      <section className="trailer-section section-pad" id="trailer" aria-labelledby="trailer-title">
        <div className="trailer-heading">
          <p className="eyebrow">CINEMA & TRAILERS</p>
          <h2 id="trailer-title">
            WATCH THE ACTION<br />
            <em>IN 4K.</em>
          </h2>
        </div>
        <div className="trailer-layout">
          <div className="chapter-list" role="tablist" aria-label="Game trailer playlist">
            {trailerChapters.map((item, index) => (
              <button
                type="button"
                key={item.title}
                className={activeChapter === index ? 'active' : ''}
                role="tab"
                aria-selected={activeChapter === index}
                onClick={() => setActiveChapter(index)}
              >
                <span>CHAPTER {item.number}</span>
                <b>{item.title}</b>
                <small>{item.copy}</small>
              </button>
            ))}
          </div>
          <div className="trailer-preview visual">
            <video
              ref={videoRef}
              key={chapter.videoSrc}
              controls
              autoPlay
              muted
              loop
              playsInline
              poster={chapter.poster}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src={chapter.videoSrc} type="video/mp4" />
            </video>
            <div className="trailer-caption" style={{ zIndex: 10 }}>
              <span>CHAPTER {chapter.number}</span>
              <b>{chapter.title}</b>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${chapter.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="trailer-external-btn"
              title="Watch full trailer on YouTube"
              style={{ zIndex: 10 }}
            >
              <FiExternalLink />
            </a>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="home-stats" aria-label="Portfolio statistics">
        {stats.map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      {/* Studio & Tech Showcase */}
      <section className="studio-panel">
        <div className="studio-visual visual">
          <MediaImage src={media.visuals.studio} alt="AAA Game Development Studio Workspace" />
          <span>STUDIO // INNOVATION LAB</span>
        </div>
        <div className="studio-copy">
          <p className="eyebrow">CRAFT & ENGINEERING</p>
          <h2>
            WE BUILD<br />
            <em>LIVING WORLDS.</em>
          </h2>
          <p>
            From sub-frame input responsiveness and ray-traced spatial audio to neural character physics, our global teams push the boundaries of real-time interactive entertainment.
          </p>
          <Link className="text-link" to="/studio">
            DISCOVER THE STUDIO <i>↗</i>
          </Link>
        </div>
      </section>

      {/* Call to action */}
      <section className="home-cta section-pad">
        <p className="eyebrow">READY TO JUMP IN?</p>
        <h2>
          THE NEXT GENERATION<br />
          <em>AWAITS YOU.</em>
        </h2>
        <Link className="button button-red" to="/games">
          EXPLORE ALL GAMES <FiArrowDownRight />
        </Link>
      </section>

      <TrailerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} trailerId={currentTrailerId} title={currentTrailerTitle} />
    </main>
  )
}
