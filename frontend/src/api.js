import axios from 'axios';

// 1. Create the Axios instance with your backend base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// 2. Add a request interceptor
// This runs BEFORE every request is sent to the backend
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    // Attach the token to the Authorization header
    // Use the "Bearer" scheme which is standard for JWT
    req.headers.Authorization = `Bearer ${token}`;
  }
  
  return req;
}, (error) => {
  // Handle request errors here
  return Promise.reject(error);
});

// 3. Optional: Add a response interceptor
// This is useful for handling global errors, like a 401 Unauthorized (token expired)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If the token is invalid or expired, log the user out
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      // You could also redirect to login here: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;