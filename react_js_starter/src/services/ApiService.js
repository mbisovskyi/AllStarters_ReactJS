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
        if (response.status === 200) {
            return response;
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

    return Promise.reject(error);
}

//#endregion