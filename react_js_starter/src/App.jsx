// React imports
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Context imports
import ErrorContext from "./contexts/ErrorContext";

// Component imports
import { NavBar } from './components/NavBar/NavBar';

// Page imports
import { HomePage } from "./pages/HomePage/HomePage";
import { RegisterAccountPage } from "./pages/RegisterAccountPage/RegisterAccountPage";
import { LoginAccountPage } from "./pages/LoginAccountPage/LoginAccountPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { TestPage } from "./pages/TestPage/TestPage";

import './App.css'
function App() {

  const { resetErrors } = useContext(ErrorContext);

  const applicationMode = import.meta.env.VITE_APP_MODE;

    useEffect(() => {
    resetErrors();
  }, [])
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
        <Route path="/" element={ <HomePage/> } />
        <Route path="/account/register" element={ <RegisterAccountPage /> } />
        <Route path="/account/login" element={ <LoginAccountPage /> } />
        <Route path="/about" element={ <AboutPage /> } />
        <Route path="/test" element={ <TestPage/> } />
      </Routes>
    </>
  )
}

export default App
