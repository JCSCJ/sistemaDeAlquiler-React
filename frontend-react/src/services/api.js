import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error);
    if (error.code === 'ECONNREFUSED') {
      console.error('¿El servidor de Spring Boot está corriendo en el puerto 8080?');
    }
    return Promise.reject(error);
  }
);

export default api;