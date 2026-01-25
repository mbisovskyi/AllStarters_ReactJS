// React imports
import { createContext, useState } from "react";

// Context imports
import { ErrorContextRef } from "./refs/ErrorContextRef";

// Create Context
export const ErrorContext = createContext();

// Context Provider
export function ErrorProvider({children}){
    const [errors, setErrors] = useState([]);
    ErrorContextRef.setFieldErrors = setErrors;

    function resetErrors(){
        setErrors([]);
    }

    const contextData = {
        // Context variables
        errors,

        // Context functions
        setErrors,
        resetErrors
    }

    return (
        <ErrorContext.Provider value={contextData}>
            {children}
        </ErrorContext.Provider>
    );
};

export default ErrorContext;