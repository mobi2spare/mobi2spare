import axios from "axios";

const http = axios.create({
  // baseURL: "http://api.mobi2spare.com",
  baseURL: 'http://localhost:8800',
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
