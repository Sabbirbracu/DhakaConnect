import axios from 'axios';

const api = axios.create({
    baseURL: 'http://your-backend-url/api', // Replace with your Laravel backend API URL
});

export default api;
