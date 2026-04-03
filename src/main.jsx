import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { BoothProvider } from './context/BoothContext'
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BoothProvider>
        <App />
      </BoothProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
