import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { navigation } from '../data/navigation'

export default function Header() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false); const menu = useRef(null); const location = useLocation()
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'auto' }) }, [location.pathname])
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 32); fn(); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn) }, [])
  useEffect(() => {
    if (!open) return undefined
    const keydown = event => {
      if (event.key === 'Escape') return setOpen(false)
      if (event.key !== 'Tab') return
      const nodes = menu.current?.querySelectorAll('a,button'); if (!nodes?.length) return
      const first = nodes[0]; const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.body.classList.add('menu-open'); window.addEventListener('keydown', keydown); menu.current?.querySelector('a')?.focus()
    return () => { document.body.classList.remove('menu-open'); window.removeEventListener('keydown', keydown) }
  }, [open])
  return <header className={`site-header ${scrolled || open ? 'scrolled' : ''}`}>
    <Link className="wordmark" to="/" aria-label="Activision Gaming Portfolio home">ACTIVISION<span>/ STUDY</span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <NavLink to={item.to} key={item.to}>{item.label}</NavLink>)}</nav>
    <Link className="header-contact" to="/contact">START A CONVERSATION <i>↗</i></Link>
    <button className="menu-button" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
    {open && <nav className="mobile-menu" aria-label="Mobile navigation" ref={menu}><div>{navigation.map((item, i) => <NavLink to={item.to} key={item.to} onClick={() => setOpen(false)}><small>0{i + 1}</small>{item.label}</NavLink>)}</div><p>AN ORIGINAL ACADEMIC EXPERIENCE<br />NOT AFFILIATED WITH ACTIVISION.</p></nav>}
  </header>
}
