import { useRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

/**
 * GameSearch — Accessible search input with clear button and empty state.
 * Controlled component: receives value + onChange from parent.
 */
export default function GameSearch({ value, onChange }) {
  const inputRef = useRef(null)

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="gs-wrapper">
      <label htmlFor="games-search-input" className="gs-sr-label">
        Search games
      </label>
      <FiSearch className="gs-icon" aria-hidden="true" />
      <input
        ref={inputRef}
        id="games-search-input"
        type="search"
        className="gs-input"
        placeholder="SEARCH GAMES..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button
          type="button"
          className="gs-clear"
          onClick={handleClear}
          aria-label="Clear search"
          title="Clear search"
        >
          <FiX />
        </button>
      )}
    </div>
  )
}
