import Axios from 'axios';

const apiUrl = process.env.REACT_APP_ENVIRONMENT == "PRODUCTION" ? process.env.REACT_APP_PRODUCTION_BACKEND_URL : process.env.REACT_APP_DEVELOPMENT_BACKEND_URL;

Axios.defaults.baseURL = `${apiUrl}/api`;

// Axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";

Axios.interceptors.request.use(
    function(config) {
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

Axios.interceptors.response.use((response) => {
    return response;
    },
    function (error) {
    return Promise.reject(error)
})