import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@/styles/_reset.scss'
import '@/styles/index.scss'

function processInnerHeight() {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

addEventListener("resize", processInnerHeight)
processInnerHeight();
createRoot(document.getElementById('root')).render(
  <App />
)
