import { Link } from 'react-router-dom'
import { navigation } from '../data/navigation'

export default function Footer() {
  return <footer className="site-footer"><div className="footer-top"><p className="eyebrow">READY WHEN YOU ARE</p><h2>MAKE<br /><em>THE NEXT MOVE.</em></h2><Link className="button button-red" to="/contact">GET IN TOUCH <i>↗</i></Link></div><div className="footer-bottom"><Link className="wordmark" to="/">ACTIVISION<span>/ STUDY</span></Link><nav>{navigation.map(i => <Link to={i.to} key={i.to}>{i.label}</Link>)}</nav><p>© 2026 ACADEMIC PORTFOLIO. NOT OFFICIAL.</p></div></footer>
}
