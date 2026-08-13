import { Link } from 'react-router-dom'
export default function NotFound() { return <main className="not-found"><p className="eyebrow">404 / OUT OF RANGE</p><h1>WORLD NOT<br /><em>FOUND.</em></h1><p>The route you requested is no longer on this map.</p><Link to="/" className="button button-red">RETURN HOME</Link></main> }
