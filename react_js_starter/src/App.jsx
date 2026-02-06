// React imports
import { Routes, Route } from "react-router-dom";

// Component imports
import { NavBar } from './components/NavBar/NavBar';

// System imports
import { AnonymousRoute, ProtectedRoute } from "./system/Routes";

// Page imports
import { HomePage } from "./pages/HomePage/HomePage";
import { RegisterAccountPage } from "./pages/RegisterAccountPage/RegisterAccountPage";
import { LoginAccountPage } from "./pages/LoginAccountPage/LoginAccountPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { TestPage } from "./pages/TestPage/TestPage";
import { ForbiddenPage } from "./pages/ForbiddenPage/ForbiddenPage";

import './App.css'
function App() {
  const applicationMode = import.meta.env.VITE_APP_MODE;

  return (
    <>
      <div>
          { applicationMode == 'Development' ? 
            <p className="max-absolute top-right red-shadow twinkle-element"><b>{applicationMode}</b></p> : null
          }
      </div>
      <NavBar />

      {/* Routes configuration goes below */}
      <Routes>
        <Route path="/" element={ <ProtectedRoute> <HomePage /> </ProtectedRoute> } />
        <Route path="/account/register" element={ <AnonymousRoute> <RegisterAccountPage /> </AnonymousRoute> } />
        <Route path="/account/login" element={ <AnonymousRoute> <LoginAccountPage /> </AnonymousRoute> } />
        <Route path="/about" element={ <AboutPage /> } />
        <Route path="/test" element={ <TestPage/> } />
        <Route path="/forbidden" element={ <ForbiddenPage /> } />
      </Routes>
    </>
  )
}


export default App
