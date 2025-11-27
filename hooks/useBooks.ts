import type { BookListingDetails } from '@/types/interfaces';
import { api, fetcher } from '@/services/api';
import useSWR from 'swr';

export const useBooks = () => {
  const { data, isLoading, error, mutate } = useSWR<BookListingDetails[]>(`/anuncios/getAllAnuncios`, fetcher);
  
  const createBook = async (formData: FormData) => {
    await api.post('/anuncios/createAnuncio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    mutate();
  };


//   export async function createBookListing(formData: FormData) {
//   try {
//     const response = await api.post('/anuncios/createAnuncio', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao criar anúncio:', error);
//     throw error;
//   }
// }

  return {
    books: data,
    isLoading,
    error,
    createBook,
  };
};
