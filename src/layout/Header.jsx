import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi'
import { navigation } from '../data/navigation'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menu = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const keydown = (event) => {
      if (event.key === 'Escape') return setOpen(false)
      if (event.key !== 'Tab') return
      const nodes = menu.current?.querySelectorAll('a,button')
      if (!nodes?.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.body.classList.add('menu-open')
    window.addEventListener('keydown', keydown)
    menu.current?.querySelector('a')?.focus()
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', keydown)
    }
  }, [open])
  return (
    <header className={`site-header ${scrolled || open ? 'scrolled' : ''}`}>
      <div className="header-left">
        <Link className="wordmark" to="/" aria-label="Activision Gaming Portfolio home">
          ACTIVISION<span>STUDIO</span>
        </Link>
        <div className="header-status-pill">
          <span className="status-dot" />
          <span className="status-text">NETWORK // ONLINE</span>
        </div>
      </div>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <NavLink to={item.to} key={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="header-right">
        <Link className="header-contact button button-outline-sm" to="/contact">
          <span>CONTACT</span> <FiArrowUpRight />
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation" ref={menu}>
          <div className="mobile-menu-links">
            {navigation.map((item, i) => (
              <NavLink to={item.to} key={item.to}>
                <small>0{i + 1}</small>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="mobile-menu-footer">
            <p>ACTIVISION STUDIO PORTFOLIO — 2026</p>
            <Link to="/contact" className="button button-red">
              GET IN TOUCH <FiArrowUpRight />
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
