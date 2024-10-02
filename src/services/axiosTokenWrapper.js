
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateLocalStorage } from './updateLocalStorage';

const axiosTokenWrapper = axios.create({
  baseURL: 'http://localhost:5000'
});

// Add a request interceptor to include the Bearer token
axiosTokenWrapper.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token)
      config.headers['Authorization'] = `Bearer ${token}`;
    else
      delete axiosTokenWrapper.defaults.headers.common['Authorization'];

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosTokenWrapper.interceptors.response.use(
  (response) => response,
  (error) => {
    // handle 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized - 401');
      toast.error('Your token was expired, please log in again');
      updateLocalStorage('token');
      updateLocalStorage('userEmail');
      updateLocalStorage('userType');
    }
    return Promise.reject(error);
  }
);



export default axiosTokenWrapper;