import { token } from '@/mock/token';
import { baseUrl } from '@/services/api';
import axios from 'axios';
import useSWR from 'swr';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export function useFetch<T>(url: string) {
  const { data, error, isLoading } = useSWR<T>(url, async (url: string) => {
    const response = await api.get<T>(url);
    return response.data;
  });

  return {
    data,
    isLoading,
    isError: error,
  };
}
