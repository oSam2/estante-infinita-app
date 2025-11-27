import axios from 'axios';
import { getStoredToken } from '../actions/auth';
import { BASE_API_URL } from '@/lib/constants';


const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = apiClient;

export const fetcher = (url: string) => api.get(url).then((res) => res.data);
