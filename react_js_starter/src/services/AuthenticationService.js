//Context imports
import { AuthenticationContextRef } from "../contexts/refs/AuthenticationContextRef";

// Model imports
import UserModel from "../models/UserModel";

// Service imports
import { API_BASE_URL, Anonymous, Authorized } from "../services/ApiService";

// Authentication endpoints
const API_ENDPOINT_ACCOUNT = `${API_BASE_URL}/account`;
const API_ENDPOINT_ACCOUNT_REGISTER = `${API_ENDPOINT_ACCOUNT}/register/`;
const API_ENDPOINT_ACCOUNT_LOGIN = `${API_ENDPOINT_ACCOUNT}/login/`;
const API_ENDPOINT_ACCOUNT_ME = `${API_ENDPOINT_ACCOUNT}/me/`;
const API_ENDPOINT_ACCOUNT_VERIFY_ACCESS = `${API_ENDPOINT_ACCOUNT}/verify-access/`;

const AuthenticationService = {

    /**
     * Handles POST method call to the API account register endpoint using register form data.
     * @param {object} formData - register form data
     */
    async handleAccountRegisterAsync(formData) {
        try {
            let response = await Anonymous.post(API_ENDPOINT_ACCOUNT_REGISTER, formData);
        } catch (error) {
            return;
        }
    },

    /**
     * Handles POST method call to the API account login endpoint using login form data.
     * @param {object} formData - login form data
     */
    async handleAccountLoginAsync(formData) {
        try {
            let response = await Anonymous.post(API_ENDPOINT_ACCOUNT_LOGIN, formData);
            const accessToken = response.data?.accessToken ?? null;
            if (accessToken) {
                AuthenticationContextRef.setAccessToken(accessToken);
                localStorage.setItem("accessToken", accessToken);

                // Once Access Token is received - Authenticate it to get user data.
                await AuthenticationService.handleAccountAuthenticateAsync();
            }

        } catch (error) {
            return;
        }
    },

    /**
     * Handles GET method call to the API account authenticate endpoint to get user data.
     */
    async handleAccountAuthenticateAsync() {
        try {
            let response = await Authorized.get(API_ENDPOINT_ACCOUNT_ME);
            if (response.data) {
                const user = UserModel.parse(response.data);
                AuthenticationContextRef.setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
            }
        } catch (error) {
            return;
        }
    },

    /**
     * Handles account logout process.
     */
    async handleAccountLogout(){
        AuthenticationContextRef.setLogout(true);
    },

    /**
     * Handles GET method call to the API account verify access endpoint to verify access token validity.
     */
    async handleAccountVerifyAccess() {     
        try {
            const response = await Authorized.get(API_ENDPOINT_ACCOUNT_VERIFY_ACCESS);
        } catch (error) {
            handleError(error);
        }
    }
}

//#region Authentication Error Handlers

function handleError(error) {
    
    const tokenError = error.response?.headers["token-error"];
    if (tokenError) {
        handleTokenError(tokenError, error.status);
    }
}

function handleTokenError(tokenError, errorStatus){
    switch (true) {

        case (tokenError === "expired" || tokenError === "invalid") && errorStatus === 401:
            setTimeout(() => {
                alert("Your session has expired. Please log in again.");
                cleanStorage();
                window.location.href = "/account/login";
            }, 50);

            break;

        case tokenError === "invalid" && errorStatus === 403:
            window.location.href = "/forbidden";
            break;

        default:
            break;
    }
}

//#endregion

//#region Private Functions

function cleanStorage(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
}

//#endregion

export default AuthenticationService;