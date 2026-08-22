import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/*
 * The production build is prerendered, so the HTML already contains a rendered
 * copy of the page. Mounting clears #root on its own, but nodes the prerenderer
 * captured from React portals live outside it and would otherwise linger as
 * duplicates of what React is about to render.
 */
for (const node of document.querySelectorAll('[data-prerendered]')) node.remove()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
