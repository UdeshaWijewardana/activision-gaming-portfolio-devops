import { Link } from 'react-router-dom'
import { FiArrowDownRight } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow">READY FOR NEXT LEVEL?</p>
          <h2>CREATE THE FUTURE WITH US.</h2>
        </div>
        <Link className="button button-red" to="/careers">
          VIEW OPEN ROLES <FiArrowDownRight />
        </Link>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="wordmark" to="/">
            ACTIVISION<span>STUDIO</span>
          </Link>
          <p>
            An industry-leading AAA interactive entertainment studio portfolio dedicated to cinematic craft, responsive combat, and deep immersive worlds.
          </p>
        </div>
        <div className="footer-col">
          <h4>EXPERIENCES</h4>
          <nav>
            <Link to="/games">All Franchises</Link>
            <Link to="/games/black-ops-6">Black Ops 6</Link>
            <Link to="/games/warzone">Warzone</Link>
            <Link to="/games/diablo-iv">Diablo IV</Link>
            <Link to="/games/sekiro">Sekiro</Link>
          </nav>
        </div>
        <div className="footer-col">
          <h4>STUDIO</h4>
          <nav>
            <Link to="/studio">Philosophy & Vision</Link>
            <Link to="/projects">Tech Pipeline</Link>
            <Link to="/careers">Life & Culture</Link>
            <Link to="/news">Studio Insights</Link>
          </nav>
        </div>
        <div className="footer-col">
          <h4>CONNECT</h4>
          <nav>
            <Link to="/contact">Direct Inquiries</Link>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube Hub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Activision Studio Portfolio. All rights reserved.</p>
        <nav aria-label="Legal navigation">
          <Link to="/studio">Privacy Policy</Link>
          <Link to="/studio">Terms of Service</Link>
          <Link to="/contact">Security</Link>
        </nav>
      </div>
      <div className="footer-disclaimer">
        <p>Academic portfolio / demonstration project. Not affiliated with or endorsed by Activision Publishing, Inc.</p>
      </div>
    </footer>
  )
}
