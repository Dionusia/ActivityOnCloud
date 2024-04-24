import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8008/api',
  /*headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here' 
  }*/
});

export default instance;