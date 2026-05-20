import axios from 'axios';

const instance = axios.create({

  baseURL: 'https://movie-hall-api.onrender.com/api',
});

export default instance;
