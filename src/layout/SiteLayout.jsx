import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import Cursor from '../components/Cursor'
import ScrollProgress from '../components/ScrollProgress'

export default function SiteLayout() {
  const location = useLocation()
  return <><ScrollProgress /><Cursor /><Header /><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .32 }}><Outlet /></motion.div></AnimatePresence><Footer /></>
}
