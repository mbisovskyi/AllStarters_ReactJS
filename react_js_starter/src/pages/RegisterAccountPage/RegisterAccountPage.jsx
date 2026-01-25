// Service imports
import AuthenticationService from "../../services/AuthenticationService";

// Hook imports
import useCustomForm from "../../hooks/useCustomForm";

// Component imports
import { ErrorBanner } from "../../components/ErrorBanner/ErrorBanner";

import "./RegisterAccountPage.css";
export function RegisterAccountPage(){

    // Form fields
    const defaultFormData = { username: "", email: "", password: "", userRole: "User" };

    // useCustomForm handlers
    const [formData, handleOnSubmit, handleOnChange] = useCustomForm(defaultFormData, AuthenticationService.handleAccountRegisterAsync)
    
    return (
        <>
            <div className="page-container" name="RegisterAccountPage">
                <form onSubmit={ handleOnSubmit }>

                    <ErrorBanner />

                    {/* Username field */}
                    <label>Username</label>
                    <input type="text" name="username" value={ formData.username } onChange={ handleOnChange } />

                    {/* Email field */}
                    <label>Email</label>
                    <input type="text" name="email" value={ formData.email } onChange={ handleOnChange } />

                    {/* Password field */}
                    <label>Password</label>
                    <input type="password" name="password" value={ formData.password } onChange={ handleOnChange }/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}