import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default myAxios;
