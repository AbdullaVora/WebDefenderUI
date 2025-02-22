// import axios from "axios";

// const apiInstance = axios.create({
//   baseURL: "https://webdefender-backend.onrender.com", // Use the correct backend URL
//   timeout: 1000,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// apiInstance.interceptors.request.use(
//   (config) => {
//     const storedToken = localStorage.getItem("auth_token");
//     if (storedToken) {
//       console.log("Token found:", storedToken);
//       config.headers["Authorization"] = `Bearer ${storedToken}`; // No JSON.parse() needed
//     } else {
//       console.log("No token found in local storage.");
//     }
//     return config;
//   },
//   (error) => {
//     console.error("Request Error:", error);
//     return Promise.reject(error);
//   }
// );

// export default apiInstance;

import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const publicRoutes = [
  "/api/auth/register",
  "/api/auth/login",
];

apiInstance.interceptors.request.use(
  (config) => {
    // Check if the current route is public
    const isPublicRoute = publicRoutes.some((route) =>
      config.url.includes(route)
    );

    if (!isPublicRoute) {
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken) {
        config.headers["Authorization"] = `Bearer ${storedToken}`;
      } else {
        console.log("No token found for protected route.");
      }
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

export default apiInstance;
