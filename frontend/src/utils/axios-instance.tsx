import axios from 'axios';

const myAxios = axios.create({
  baseURL: `${import.meta.env.VITE_APIURL}/api`, // Backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default myAxios;
