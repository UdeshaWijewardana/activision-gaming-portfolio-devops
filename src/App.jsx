import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import SiteLayout from './layout/SiteLayout'
import Home from './pages/Home'
const Games = lazy(() => import('./pages/Games'))
const GameDetail = lazy(() => import('./pages/GameDetail'))
const Studio = lazy(() => import('./pages/Studio'))
const Projects = lazy(() => import('./pages/Projects'))
const Careers = lazy(() => import('./pages/Careers'))
const News = lazy(() => import('./pages/News'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() { return <Suspense fallback={<div className="route-loading" aria-label="Loading page" />}><Routes><Route element={<SiteLayout />}><Route path="/" element={<Home />} /><Route path="/games" element={<Games />} /><Route path="/games/:slug" element={<GameDetail />} /><Route path="/studio" element={<Studio />} /><Route path="/projects" element={<Projects />} /><Route path="/careers" element={<Careers />} /><Route path="/news" element={<News />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Route></Routes></Suspense> }
