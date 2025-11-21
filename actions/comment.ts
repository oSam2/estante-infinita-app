import { api } from '@/services/api';

export async function createComentario(payload: { texto: string; anuncioId: number }) {
  try {
    const res = await api({
      path: '/comentarios/createComentario',
      method: 'POST',
      data: payload,
    });

    return res;
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    throw error;
  }
}
