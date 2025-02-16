import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

apiInstance.interceptors.request.use(config => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
        console.log('Token found:', storedToken);
        config.headers['Authorization'] = `Bearer ${storedToken}`; // No JSON.parse() needed
    } else {
        console.warn('No token found in local storage.');
    }
    return config;
}, error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
});

export default apiInstance;