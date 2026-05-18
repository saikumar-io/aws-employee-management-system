import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT Token into headers for every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('emp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional global error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear legacy storage references silently without redirect loops
      localStorage.removeItem('emp_token');
      localStorage.removeItem('emp_role');
    }
    return Promise.reject(error);
  }
);

export default api;
