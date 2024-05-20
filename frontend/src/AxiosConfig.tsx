import axios, { AxiosInstance } from 'axios';

export function createAxiosInstance(navigate: Function): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  axiosInstance.interceptors.response.use(  
    response => response,
    error => {
      if(error.response && error.response.status === 401){
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}