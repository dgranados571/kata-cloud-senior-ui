import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Axios Config')
        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = 'token_authorization';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
