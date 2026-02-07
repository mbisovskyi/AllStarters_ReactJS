// React imports
import { createContext, useContext, useState, useEffect } from "react";

// Context imports
import { AuthenticationContextRef } from "./refs/AuthenticationContextRef";

// Create Context
export const AuthenticationContext = createContext(null);

// Context Provider
export function AuthenticationProvider({ children }){

    // Context/Ref variables and functions
    const [user, setUser] = useState(null);
    AuthenticationContextRef.setUser = setUser;
    AuthenticationContextRef.user = user;

    const [accessToken, setAccessToken] = useState(null);
    AuthenticationContextRef.setAccessToken = setAccessToken; 
    AuthenticationContextRef.accessToken = accessToken;

    // Hydrating context values from local storage
    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedAccessToken) setAccessToken(storedAccessToken);
        if (storedUser) setUser(storedUser);
    }, [])

    // Available Context Data
    const contextData = {

        // Context variables
        user,
    }
    
    return (
         <AuthenticationContext.Provider value={contextData}>
            {children}
        </AuthenticationContext.Provider>
    )
};

export function useAuthentication() {
    return useContext(AuthenticationContext);
}

export default AuthenticationContext;
       