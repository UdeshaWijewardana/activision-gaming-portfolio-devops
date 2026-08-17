import PageHero from './PageHero'
import MediaImage from '../components/media/MediaImage'
import { projects } from '../data/projects'
import { media } from '../data/media'

export default function Projects() {
  return (
    <main>
      <PageHero
        label="ENGINEERING & DESIGN / 03"
        title={
          <>
            SYSTEMS &<br />
            <em>INNOVATION.</em>
          </>
        }
        copy="Deep technical case studies into our proprietary animation frameworks, cloud game servers, and real-time spatial acoustics."
        visual="engineTech"
      />
      <section className="section-pad projects-page">
        <div className="projects-list">
          {projects.map((project) => (
            <article key={project.id}>
              <div className="project-number">{project.id}</div>
              <div className="project-visual visual">
                <MediaImage src={media.visuals[project.visual] || media.visuals.engineTech} alt={project.title} />
                <span>{project.discipline}</span>
              </div>
              <div className="project-copy">
                <h2>{project.title}</h2>
                <p>{project.overview}</p>
                <dl>
                  <div>
                    <dt>CORE TECHNICAL CHALLENGE</dt>
                    <dd>{project.challenge}</dd>
                  </div>
                  <div>
                    <dt>TECHNOLOGY STACK</dt>
                    <dd>{project.stack}</dd>
                  </div>
                  {project.metrics && (
                    <div>
                      <dt>PERFORMANCE METRICS</dt>
                      <dd>{project.metrics}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
