import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

declare module 'react' {
  interface CSSProperties {
    [key: string]: any
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
