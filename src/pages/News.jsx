import PageHero from './PageHero'
import MediaImage from '../components/media/MediaImage'
import { news } from '../data/news'
import { media } from '../data/media'

export default function News() {
  return (
    <main>
      <PageHero
        label="STUDIO DISPATCH / 05"
        title={
          <>
            THE LATEST<br />
            <em>INSIGHTS.</em>
          </>
        }
        copy="Perspectives on game technology, world design, audio simulation, and studio culture."
        visual="news"
      />

      <section className="section-pad">
        <div className="news-grid">
          {news.map((item) => (
            <article key={item.id} className="news-card">
              <div className="news-art visual">
                <MediaImage src={media.visuals[item.visual] || media.visuals.news} alt={item.title} />
              </div>
              <div className="news-copy">
                <div className="news-meta">
                  <span style={{ color: 'var(--accent-red)' }}>{item.category}</span>
                  <span>{item.date} · {item.readTime}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By {item.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
