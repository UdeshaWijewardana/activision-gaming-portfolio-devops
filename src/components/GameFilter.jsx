/**
 * GameFilter — Horizontal filter bar with scrollable mobile support.
 * Controlled component: receives active + setActive from parent.
 */
export default function GameFilter({ filters, active, onSelect }) {
  return (
    <div className="gf-bar" role="group" aria-label="Filter games by category">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`gf-btn${active === filter ? ' gf-btn--active' : ''}`}
          onClick={() => onSelect(filter)}
          aria-pressed={active === filter}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
