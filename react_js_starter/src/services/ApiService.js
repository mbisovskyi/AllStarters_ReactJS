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
        if (error.response?.status === 400) {
            handleErrors(error.response?.data?.errors);
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
    (error) => {
        handleErrors(error.response?.data?.errors)
        throw error; // rethrow the error so it can be handled further up the chain
    }
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
    (error) => { 
        handleErrors(error.response?.data?.errors)
        throw error; // rethrow the error so it can be handled further up the chain
    }
);

//#region Private Functions
function handleErrors(errors){
    if (errors) {
        const flattenErrors = Object.values(errors).flat();
        ErrorContextRef.setFieldErrors(flattenErrors);
    }
}

//#endregion