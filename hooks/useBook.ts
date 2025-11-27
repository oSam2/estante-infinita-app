import { fetcher } from "@/services/api";
import type { BookListingDetails } from "@/types/interfaces";
import useSWR from "swr";

export const useBook = (id: number) => {
  const { data, isLoading, error } = useSWR<BookListingDetails>(`/anuncios/getAnuncioById/${id}`, fetcher);

  return {
    book: data,
    isLoading,
    error,
  };
}