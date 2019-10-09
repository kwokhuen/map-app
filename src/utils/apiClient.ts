import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

function createClient(options: AxiosRequestConfig = {}): AxiosInstance {
  const instance = axios.create({
    timeout: 10000,
    ...options
  });

  return instance;
}

export const apiClient = createClient({
  baseURL: process.env.REACT_APP_API_BASE_URL
});
