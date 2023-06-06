import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { DateProvider } from './contexts/DateProvider.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DateProvider>
          <App />
        </DateProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
