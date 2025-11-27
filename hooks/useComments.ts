import { api, fetcher } from '@/services/api';
import type { Comment } from '@/types/interfaces';
import useSWR from 'swr';

export const useComments = (listingId: number) => {
  const { data, isLoading, error, mutate } = useSWR<Comment[]>(
    `/comentarios/listByAnuncio/${listingId}`,
    fetcher
  );

  const createComment = async (listingId: number, content: string) => {
    await api.post('/comentarios/createComentario', {
      anuncioId: listingId,
      texto: content,
    });
    await mutate();
  };

  const updateComment = async (commentId: number, content: string) => {
    await api.put(`/comentarios/${commentId}`, {
      texto: content,
    });
    await mutate();
  };

  const deleteComment = async (commentId: number) => {
    await api.delete(`/comentarios/${commentId}`);
    await mutate();
  };

  return {
    comments: data,
    isLoading,
    error,
    createComment,
    updateComment,
    deleteComment,
  };
};
