import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/index.css'
import './styles/theme.css'
import './styles/home-redesign.css'

createRoot(document.getElementById('root')).render(<StrictMode><BrowserRouter basename={import.meta.env.BASE_URL}><ErrorBoundary><App /></ErrorBoundary></BrowserRouter></StrictMode>)
