import axios, { AxiosInstance } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// 기본 인스턴스 - 토큰 없이 요청
const instance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

// 인증된 요청을 위한 인스턴스 - 토큰 포함
const authInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

// 인증 인스턴스에만 토큰 추가 인터셉터 적용
authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance, authInstance };