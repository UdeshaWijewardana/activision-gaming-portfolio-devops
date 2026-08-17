import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, expect, test } from 'vitest'
import App from './App'
import VideoHero from './components/media/VideoHero'

function renderApp(route = '/') { return render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>) }

afterEach(cleanup)

test('renders the home experience', () => { renderApp(); expect(screen.getByRole('heading', { level: 1, name: /game/i })).toBeInTheDocument(); expect(screen.getByRole('link', { name: /explore games/i })).toHaveAttribute('href', '/games') })

test('filters games by category', async () => {
  const user = userEvent.setup()
  renderApp('/games')
  const filterBtn = await screen.findByRole('button', { name: 'SPORTS' })
  await user.click(filterBtn)
  expect(await screen.findByRole('heading', { name: /tony hawk/i })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: /^warzone$/i })).not.toBeInTheDocument()
})

test('shows contact validation errors', async () => {
  const user = userEvent.setup()
  renderApp('/contact')
  const submitBtn = await screen.findByRole('button', { name: /send message/i })
  await user.click(submitBtn)
  expect(await screen.findByText(/tell us your name/i)).toBeInTheDocument()
  expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument()
})

test.each([
  ['/studio', /made to/i],
  ['/projects', /systems/i],
  ['/careers', /bring your/i],
  ['/news', /the latest/i],
  ['/contact', /start a/i],
  ['/games/call-of-duty', /call of duty/i],
  ['/missing-route', /world not/i]
])('renders route %s', async (route, heading) => {
  renderApp(route)
  expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument()
})

test('uses the CSS visual scene after the optional hero video fails to load', async () => {
  const { container } = render(<VideoHero />)
  const video = container.querySelector('video')
  fireEvent.error(video)
  await waitFor(() => expect(document.querySelector('.video-hero.visual-warzone')).toBeInTheDocument())
  expect(document.querySelector('.video-hero video')).not.toBeInTheDocument()
})

test('mobile menu opens and closes with Escape', async () => {
  const user = userEvent.setup(); renderApp('/'); await user.click(screen.getByRole('button', { name: /open navigation/i })); expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument(); await user.keyboard('{Escape}'); await waitFor(() => expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument())
})
