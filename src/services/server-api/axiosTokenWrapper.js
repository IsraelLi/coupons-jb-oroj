
import axios from 'axios';

const axiosTokenWrapper = axios.create({
  baseURL: 'http://localhost:5092'
});

// Add a request interceptor to include the Bearer token
axiosTokenWrapper.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.table({ token });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosTokenWrapper;