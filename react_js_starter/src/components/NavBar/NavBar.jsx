
// React imports
import { useContext, useEffect } from "react";

// Context imports
import AuthenticationContext from "../../contexts/AuthenticationContext.jsx";

// Component imports
import { NavBarLogo } from "./NavBarLogo.jsx";
import { NavBarUnauthenticated } from "./NavBarUnauthenticated.jsx";
import { NavBarAuthenticated } from "./NavBarAuthenticated.jsx";

import "./Navbar.css";
export function NavBar() {

   const { user } = useContext(AuthenticationContext);

   useEffect(() => {
   }, [user])

   return (
      <>
         <nav className="navbar" name="NavBar">
            <div className="navbar-container">
               <NavBarLogo />

               { user ? (
                  <NavBarAuthenticated user={user}/>
               ) : (
                  <NavBarUnauthenticated />
               )} 
            </div>
         </nav>
      </>
   )
}