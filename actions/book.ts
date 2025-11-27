import { api } from '@/services/api';


export async function searchBookListings(searchParams: {
  query?: string;
  genero?: string;
  condicao?: string;
  tipo?: string;
}) {
  try {
    // Constrói os parâmetros de query string
    const params = new URLSearchParams();

    if (searchParams.query) {
      params.append('q', searchParams.query);
    }
    if (searchParams.genero) {
      params.append('genero', searchParams.genero);
    }
    if (searchParams.condicao) {
      params.append('condicao', searchParams.condicao);
    }
    if (searchParams.tipo) {
      params.append('tipo', searchParams.tipo);
    }

    const queryString = params.toString();
    const endpoint = queryString ? `/anuncios/search?${queryString}` : '/anuncios/getAllAnuncios';

    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error);
    throw error;
  }
}
