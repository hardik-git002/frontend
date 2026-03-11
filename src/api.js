import axios from "axios";

export const authAPI = axios.create({
  baseURL: "http://127.0.0.1:8001",
});

export const inventoryAPI = axios.create({
  baseURL: "http://127.0.0.1:8002",
});

export const postsAPI = axios.create({
  baseURL: "http://127.0.0.1:8003",
});

// Automatically attach JWT token to every request
const addToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

inventoryAPI.interceptors.request.use(addToken);
postsAPI.interceptors.request.use(addToken);