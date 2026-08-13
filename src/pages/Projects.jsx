import { Link } from 'react-router-dom'
import PageHero from './PageHero'
import { projects } from '../data/projects'
import MediaImage from '../components/media/MediaImage'
import { media } from '../data/media'

export default function Projects() { return <main><PageHero label="SELECTED WORK / 03" title={<>SYSTEMS<br /><em>WITH SOUL.</em></>} copy="Case-study presentations for original interactive design explorations." visual="blackops" /><section className="projects-list section-pad">{projects.map(project => <article key={project.id}><div className="project-number">{project.id}</div><div className={`project-visual visual visual-${project.visual}`}><MediaImage src={media.visuals.project} alt="An original fictional game-world project scene" /><span>{project.discipline}</span></div><div className="project-copy"><p className="eyebrow">{project.discipline}</p><h2>{project.title}</h2><p>{project.overview}</p><dl><div><dt>THE CHALLENGE</dt><dd>{project.challenge}</dd></div><div><dt>TECHNOLOGY</dt><dd>{project.stack}</dd></div></dl><Link className="text-link" to="/contact">DISCUSS THIS APPROACH <i>↗</i></Link></div></article>)}</section></main> }
