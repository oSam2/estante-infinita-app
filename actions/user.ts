import { token } from '@/mock/token';
import { api } from '@/services/api';

export async function fetchUser() {
  try {
    const res = await api({
      path: '/users/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }

    return [];
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error);
    return [];
  }
}
