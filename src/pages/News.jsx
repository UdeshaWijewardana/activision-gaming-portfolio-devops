import { Link } from 'react-router-dom'
import PageHero from './PageHero'
import { news } from '../data/news'
import MediaImage from '../components/media/MediaImage'
import { media } from '../data/media'

export default function News() { const [featured, ...latest] = news; return <main><PageHero label="STUDIO NOTES / 05" title={<>THE LATEST<br /><em>SIGNAL.</em></>} copy="Original editorial content for this project. Real Activision news should link to official sources." visual="warzone" /><section className="section-pad news"><article className="featured-news"><div className={`visual visual-${featured.visual}`}><MediaImage src={media.visuals.news} alt="An original fictional game-world field note scene" /></div><div><p className="eyebrow">FEATURED / {featured.category}</p><span>{featured.date}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><Link className="text-link" to="/contact">READ THE STORY <i>↗</i></Link></div></article><p className="eyebrow latest-label">LATEST STORIES</p><div className="news-list">{latest.map(item => <article key={item.id}><div className={`visual visual-${item.visual}`}><MediaImage src={media.visuals.news} alt="" /></div><div><p className="eyebrow">{item.category} / {item.date}</p><h3>{item.title}</h3><p>{item.excerpt}</p><Link className="text-link" to="/contact">READ MORE <i>↗</i></Link></div></article>)}</div></section></main> }
