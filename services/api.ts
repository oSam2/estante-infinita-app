import AsyncStorage from '@react-native-async-storage/async-storage';

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
    // Read token from AsyncStorage (if any)
    let token: string | null = null;
    try {
      token = await AsyncStorage.getItem('@estante:token');
    } catch (e) {
      console.warn('Could not read token from storage', e);
    }

    const incomingHeaders = (options.headers || {}) as Record<string, string>;
    const headersObj: Record<string, string> = {
      ...incomingHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    let body = data;
    // If data is a plain object and no Content-Type is provided, assume JSON
    const contentType = headersObj['Content-Type'] || headersObj['content-type'];
    if (data && typeof data === 'object' && !(data instanceof FormData) && !contentType) {
      headersObj['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    const response = await fetch(`${baseUrl}${path}`, {
      method: options.method || 'GET',
      body,
      headers: headersObj as HeadersInit,
      ...options,
    });

    if (!response.ok) {
      // try to parse error body
      const errorBody = await response.json().catch(() => ({}));
      const message = errorBody?.error || 'Ocorreu um erro na requisição';
      const err: any = new Error(message);
      err.status = response.status;
      err.data = errorBody;
      throw err;
    }

    const resData = await response.json().catch(() => ({}));

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
