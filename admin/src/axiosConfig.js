import axios from 'axios';
import { getToken } from './tokenutility'; 

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {  
      console.error('Unauthorized request. Please check your token.');
    } else {
        console.log("g");
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
