import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiPlay } from 'react-icons/fi'
import { games } from '../data/games'
import NotFound from './NotFound'
import GameCard from '../components/GameCard'
import MediaImage from '../components/media/MediaImage'
import { media } from '../data/media'

export default function GameDetail() {
  const { slug } = useParams(); const game = games.find(item => item.slug === slug)
  if (!game) return <NotFound />
  const related = games.filter(item => item.slug !== game.slug).slice(0, 2)
  return <main><section className={`detail-hero visual visual-${game.visual}`}><MediaImage src={media.visuals[game.visual]} alt="" priority /><div className="video-shade" /><Link className="back-link" to="/games"><FiArrowLeft /> ALL GAMES</Link><div><p className="eyebrow">{game.category} / {game.year}</p><h1>{game.title}</h1><p>{game.tagline}</p></div><button className="play-disc" aria-label="Play trailer placeholder"><FiPlay /></button></section><section className="detail-intro section-pad"><p className="eyebrow">THE EXPERIENCE</p><div><h2>{game.description}</h2><div className="detail-meta"><span><b>GENRE</b>{game.category}</span><span><b>PLATFORM</b>{game.platforms}</span><span><b>STATUS</b>{game.year}</span></div></div></section><section className="feature-list">{game.features.map((feature, index) => <article key={feature}><span>0{index + 1}</span><h3>{feature}</h3><p>Designed to make the player’s next decision feel clear, meaningful and immediate.</p></article>)}</section><section className="tech-panel visual visual-blackops"><MediaImage src={media.visuals.blackops} alt="" /><div className="video-shade" /><div><p className="eyebrow">TECHNOLOGY</p><h2>BUILT TO<br /><em>RESPOND.</em></h2><p>{game.technology}</p></div></section><section className="section-pad related"><p className="eyebrow">CONTINUE EXPLORING</p><div className="game-grid">{related.map((item, index) => <GameCard game={item} key={item.slug} index={index} />)}</div></section></main>
}
