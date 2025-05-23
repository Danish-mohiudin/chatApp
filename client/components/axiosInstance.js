import axios from 'axios';

const DB_URL = import.meta.env.VITE_DB_URL; 

const axiosInstance = axios.create({
    baseURL: DB_URL,
    withCredentials: true,  // for cookies to be sent with requests
    headers: {
        ContentType: 'application/json'
    },
});

export default axiosInstance;