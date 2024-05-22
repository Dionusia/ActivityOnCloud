import axios, { AxiosInstance } from 'axios';

export function createAxiosInstance(): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: 'http://10.20.0.193:8081',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  axiosInstance.interceptors.response.use(  
    response => response,
    error => {
      console.log('Error in AxiosConfig:', error);
      
      
      if(error.response && error.response.status === 403){
        console.log('Redirecting to login');
        window.location.href = '/login';
        // navigate('/login');
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}