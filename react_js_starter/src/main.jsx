import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthenticationProvider } from './contexts/AuthenticationContext.jsx'
import { ErrorProvider } from './contexts/ErrorContext.jsx'
import { ClearErrorsOnRouteChange } from './system/ClearErrorsOnRouteChange.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorProvider>
        <AuthenticationProvider>
          <ClearErrorsOnRouteChange/>
          <App />
        </AuthenticationProvider>
      </ErrorProvider>
    </BrowserRouter>
  </StrictMode>,
)
