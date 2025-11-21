import { token } from '@/mock/token';

export const baseUrl = 'http://localhost:3333/api';

const api = async ({
  path,
  data,
  ...options
}: {
  path: string;
  data?: any;
  method?: string;
  headers?: HeadersInit;
}) => {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: options.method || 'GET',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error('Ocorreu um erro na requisição');
    }

    const resData = await response.json();

    return {
      status: response.status,
      data: resData,
    };
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    throw error;
  }
};

export { api };
