import { Link } from 'react-router-dom'
import PageHero from './PageHero'
import SectionIntro from '../components/SectionIntro'
import MediaImage from '../components/media/MediaImage'
import { media } from '../data/media'

const values = [
  ['01', 'PLAYER OBSESSION', 'Every creative and architectural decision begins with the feeling and agency we want to leave behind.'],
  ['02', 'DISCIPLINED CURIOSITY', 'We test technical assumptions early, prototype rapidly, and refine combat loops with uncompromising purpose.'],
  ['03', 'ONE GLOBAL TEAM', 'Boundary-pushing work moves freely between gameplay design, technical art, audio physics, and distributed cloud engineering.']
]

export default function Studio() {
  return (
    <main>
      <PageHero
        label="THE STUDIO / 02"
        title={
          <>
            MADE TO<br />
            <em>MATTER.</em>
          </>
        }
        copy="A premier AAA gaming studio portfolio pioneering next-generation cinematic scale and responsive gameplay systems."
        visual="studio"
      />

      <section className="mission section-pad">
        <SectionIntro
          eyebrow="OUR MISSION"
          title={
            <>
              A CLEAR VISION,<br />
              <em>FULLY REALIZED.</em>
            </>
          }
        />
        <p className="large-copy">
          We engineer living digital worlds where art direction, low-latency technology, and human imagination align. Our goal is never more interface clutter—it is pure immersion.
        </p>
      </section>

      <section className="studio-image visual">
        <MediaImage src={media.visuals.studioCulture || media.visuals.studio} alt="Global Creative Studio Workspace" />
        <div className="image-caption">GLOBAL DEVELOPMENT NETWORK // 2026</div>
      </section>

      <section className="values section-pad">
        <p className="eyebrow" style={{ gridColumn: '1 / -1' }}>OUR CORE PILLARS</p>
        {values.map((value) => (
          <article key={value[0]}>
            <span>{value[0]}</span>
            <h3>{value[1]}</h3>
            <p>{value[2]}</p>
          </article>
        ))}
      </section>

      <section className="split-callout studio-callout">
        <div>
          <p className="eyebrow">INNOVATION & TECHNOLOGY</p>
          <h2>
            HUMAN FEELING.<br />
            <em>EXACT SYSTEMS.</em>
          </h2>
          <p>We build custom animation state machines, deterministic physics solvers, and spatial audio to empower the player in every single frame.</p>
          <Link className="button button-red" to="/projects">
            EXPLORE TECH CASE STUDIES <i>↗</i>
          </Link>
        </div>
        <div className="visual">
          <MediaImage src={media.visuals.motionCapture || media.visuals.engineTech} alt="Performance Capture & Engine R&D" />
        </div>
      </section>

      <section className="studios section-pad">
        <p className="eyebrow">OUR LOCATIONS</p>
        <h2>
          GLOBAL BY<br />
          <em>DESIGN.</em>
        </h2>
        <div>
          {[
            ['LOS ANGELES', 'CALIFORNIA, USA // HEADQUARTERS'],
            ['LONDON', 'UNITED KINGDOM // ART & MESH PIPELINES'],
            ['MELBOURNE', 'AUSTRALIA // COMBAT & DESIGN LABS'],
            ['TOKYO', 'JAPAN // LIVE OPS & TELEMETRY CLOUD']
          ].map(([city, desc], i) => (
            <span key={city}>
              0{i + 1} <b>{city}</b> <small style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{desc}</small>
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
