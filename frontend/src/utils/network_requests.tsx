import axios from 'axios';
import { TOKEN,REFRESHTOKEN, USER} from '../constants/constants';
import { BASE_URL } from './api';
import Cookies from "js-cookie";
import { getUser } from './utils';

const api = axios.create({
  baseURL: '/api',
});



// Add a request interceptor
api.interceptors.request.use(
  // 
  (config) => {
    const token = Cookies.get(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      console.log(error);
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = Cookies.get(REFRESHTOKEN);
          const role = 'GeneralUser'
          const userId = getUser();
          const response = await axios.post(BASE_URL+'/api/refreshToken', { refreshToken,role,userId });
          const { token } = response.data['user'];
          Cookies.set(TOKEN, token,{ secure: true });
          
  
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (error) {
            
            // navigate(SIGN_IN);
          // Handle refresh token error or redirect to login
        }
      }
  
      return Promise.reject(error);
    }
  );

  
export default api
