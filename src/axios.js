import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8080/api',
  baseURL: 'https://movie-hall-api.onrender.com/api',
});

export default instance;
