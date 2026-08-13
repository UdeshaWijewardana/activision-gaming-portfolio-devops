import { useMemo, useState } from 'react'
import PageHero from './PageHero'
import GameCard from '../components/GameCard'
import { filters, games } from '../data/games'

export default function Games() {
  const [active, setActive] = useState('ALL'); const visible = useMemo(() => active === 'ALL' ? games : games.filter(game => game.category === active), [active])
  return <main><PageHero label="GAME PORTFOLIO / 01" title={<>WORLD-<em>BUILDING.</em></>} copy="A cinematic collection of original franchise interface studies." visual="warzone" /><section className="section-pad games-page"><div className="filter-bar" aria-label="Game category filters">{filters.map(filter => <button className={active === filter ? 'active' : ''} key={filter} type="button" onClick={() => setActive(filter)} aria-pressed={active === filter}>{filter}</button>)}</div><div className="game-grid all-games">{visible.map((game, index) => <GameCard key={game.slug} game={game} index={index} />)}</div>{!visible.length && <p className="empty-state">No game studies match this filter.</p>}</section></main>
}
