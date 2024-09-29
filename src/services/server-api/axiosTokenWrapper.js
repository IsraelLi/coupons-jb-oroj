
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateLocalStorage } from '../updateLocalStorage';

const axiosTokenWrapper = axios.create({
  baseURL: 'http://localhost:5092'
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
  (response) => {
    if (response.status === 401) {
      console.error('Unauthorized - 401');
      toast.error('Please log in again')
      updateLocalStorage('token')
    }
    else
      return response;
  })


export default axiosTokenWrapper;