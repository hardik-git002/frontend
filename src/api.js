import axios from "axios";

export const authAPI = axios.create({
  baseURL: "https://user-auth-api-2ykc.onrender.com",
});

export const inventoryAPI = axios.create({
  baseURL: "https://inventory-api-f67z.onrender.com",
});

export const postsAPI = axios.create({
  baseURL: "https://posts-api-lyqv.onrender.com",
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