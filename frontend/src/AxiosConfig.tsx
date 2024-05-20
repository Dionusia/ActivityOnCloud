import axios from "axios";

const instance = axios.create({
  baseURL: 'http://10.20.0.193:8081',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer your_token_here' 
  }
});

export default instance;
