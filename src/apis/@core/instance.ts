import axios, { AxiosInstance } from "axios";
import { getToken } from "../localStorage";

const apiUrl = import.meta.env.VITE_API_URL;

const instance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
});

instance.interceptors.request.use((config) => {
  const accessToken = getToken();

  if (accessToken) {
    const newConfig = config;
    newConfig.headers.Authorization = `Bearer ${accessToken}`;

    return newConfig;
  }
  return config;
});

export default instance;
