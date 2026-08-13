import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

expect.extend(matchers)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {} })
})

globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.scrollTo = () => {}
