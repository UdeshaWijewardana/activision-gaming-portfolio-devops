import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Cursor() {
  const reduced = useReducedMotion(); const [enabled, setEnabled] = useState(false); const cursorRef = useRef(null)
  useEffect(() => {
    const capable = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced
    setEnabled(capable)
  }, [reduced])
  useEffect(() => {
    if (!enabled) return undefined
    const move = e => { if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)` }
    const over = e => document.body.classList.toggle('cursor-active', Boolean(e.target.closest('a,button,[data-cursor]')))
    window.addEventListener('pointermove', move); document.addEventListener('pointerover', over)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', over); document.body.classList.remove('cursor-active') }
  }, [enabled])
  return enabled ? <div className="cursor" ref={cursorRef} aria-hidden="true"><i /><b /></div> : null
}
