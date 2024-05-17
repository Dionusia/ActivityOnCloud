import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer your_token_here' 
  }
});

export default instance;
