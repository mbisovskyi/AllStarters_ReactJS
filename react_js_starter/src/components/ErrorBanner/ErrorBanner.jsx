// React imports
import { useContext } from "react";

// Context imports
import ErrorContext from "../../contexts/ErrorContext";

import "./ErrorBanner.css";
export function ErrorBanner(){

    // Context handlers
    const { errors } = useContext(ErrorContext);

    return (
        <>
            <div className="container" name="ErrorBanner">
                <ul>
                    {errors && errors.map((error, index) => (
                        <li key={index}>- {error}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}