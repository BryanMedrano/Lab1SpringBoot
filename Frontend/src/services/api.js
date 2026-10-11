import axios from 'axios';

// Lee VITE_API_URL en producción o usa localhost por defecto
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

export default api;