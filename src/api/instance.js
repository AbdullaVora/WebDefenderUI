import axios from "axios";

const apiInstance = axios.create({
    baseURL: "https://webdefender-backend.onrender.com",  // Use the correct backend URL
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

apiInstance.interceptors.request.use(config => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
        console.log('Token found:', storedToken);
        config.headers['Authorization'] = `Bearer ${storedToken}`; // No JSON.parse() needed
    } else {
        console.log('No token found in local storage.');
    }
    return config;
}, error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
});

export default apiInstance;