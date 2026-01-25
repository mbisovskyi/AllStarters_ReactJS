// Service imports
import AuthenticationService from "../../services/AuthenticationService";
import { Authorized } from "../../services/ApiService";

// Hook imports
import useCustomForm from "../../hooks/useCustomForm";

// Component imports
import { ErrorBanner } from "../../components/ErrorBanner/ErrorBanner";

import "./LoginAccountPage.css";
export function LoginAccountPage(){

    // Form fields
    const defaultFormData = { email: "", password: "" };

    // useCustomForm handlers
    const [formData, handleOnSubmit, handleOnChange] = useCustomForm(defaultFormData, AuthenticationService.handleAccountLoginAsync)

    async function runTest(){
        let response = await Authorized.get("https://localhost:5000/api/test");
        console.log(response);
    }

    return (
        <>
            <div className="page-container" name="LoginAccountPage">
                <form onSubmit={ handleOnSubmit }>

                    <ErrorBanner />

                    {/* Email field */}
                    <label>Email</label>
                    <input type="text" name="email" value={ formData.email } onChange={ handleOnChange } />
                    
                    {/* Password field */}
                    <label>Password</label>
                    <input type="password" name="password" value={ formData.password } onChange={ handleOnChange }/>

                    <button type="submit">Submit</button>
                </form>
            </div>

            <button onClick={runTest}>Run Test</button>
        </>
    )
}