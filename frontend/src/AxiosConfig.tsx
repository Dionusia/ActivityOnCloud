import axios, { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router-dom';

export function createAxiosInstance(navigate: NavigateFunction): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  axiosInstance.interceptors.response.use(  
    response => response,
    error => {
      console.log('Error in AxiosConfig:', error.response);
      // console.log(error.response.status === 403);
      
      if(error.response.status === 403){
        console.log('Redirecting to login');
        window.location.href = '/login';
        // navigate('/login');
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}