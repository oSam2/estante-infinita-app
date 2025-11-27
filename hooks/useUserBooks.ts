import { api, fetcher } from '@/services/api';
import type { BookListingDetails } from '@/types/interfaces';
import useSWR from 'swr';

export const useUserBooks = (userId: number) => {
  const { data, isLoading, error, mutate } = useSWR<BookListingDetails[]>(
    `/anuncios/getAnunciosByUser/${userId}`,
    fetcher
  );

  const deleteListing = async (listingId: number) => {
    await api.delete(`/anuncios/deleteAnuncio/${listingId}`);
    await mutate();
  };

  const toggleListingStatus = async (listingId: number, ativo: boolean) => {
    await api.patch(`/anuncios/updateAnuncio/${listingId}`, { ativo });
    await mutate();
  };

  const updateListing = async (listingId: number, formData: FormData) => {
    await api.patch(`/anuncios/updateAnuncio/${listingId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    await mutate();
  };

  return {
    userBooks: data,
    isLoading,
    error,
    deleteListing,
    toggleListingStatus,
    updateListing,
  };
};
