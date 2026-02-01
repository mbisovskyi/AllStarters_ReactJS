// Utility imports
import axios from "axios";

// Context imports
import { ErrorContextRef } from "../contexts/refs/ErrorContextRef";

export const API_BASE_URL = process.env.API_BASE_URL;

// Anonymous API interceptors
export const Anonymous = axios.create({ baseApiUrl: API_BASE_URL });
Anonymous.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response;
        }
    },
    (error) => {
        const apiErrors = error.response?.data?.errors;

        if (error.response?.status === 400) {
            if (apiErrors) {
                const flattenErrors = Object.values(apiErrors).flat();
                ErrorContextRef.setFieldErrors(flattenErrors);
            }
        }

        return Promise.reject(error);
    }
);

// Authorized API interceptors
export const Authorized = axios.create({ baseApiUrl: API_BASE_URL });
Authorized.interceptors.request.use(
    (config) => {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => handleError(error)
);

Authorized.interceptors.response.use(
    (response) => {
        switch (response.status) {
            case 200:
                return response;
            default:
                return null;
        }
    },
    (error) => handleError(error)
);

//#region Private Functions
function handleError(error){
    const errors = error.response?.data?.errors;
    if (errors) {
        const flattenErrors = Object.values(errors).flat();
        ErrorContextRef.setFieldErrors(flattenErrors);
    }

    const tokenError = error.response?.headers["token-error"];
    if (tokenError) {
        handleTokenError(tokenError, error.status);
    }

    return Promise.reject(error);
}

function handleTokenError(tokenError, errorStatus){
    switch (tokenError, errorStatus) {

        case "expired", 401:
            alert("Your session has expired. Please log in again.");
            cleanStorage();
            window.location.href = "/account/login";
            break;

        case "invalid", 401:
            alert("Your session has expired. Please log in again.");
            cleanStorage();
            window.location.href = "/account/login";
            break;

        case "forbidden", 403:
            window.location.href = "/forbidden";
            break;

        default:
            break;
    }
}

function cleanStorage(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
}

//#endregion