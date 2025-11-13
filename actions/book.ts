import { token } from '@/mock/token';
import { api } from '@/services/api';

export async function createBookListing(formData: FormData) {
  try {
    const res = await api({
      path: '/anuncios/createAnuncio',
      data: formData,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    return { success: false };
  }
}

export async function fetchBookListings() {
  try {
    const res = await api({
      path: '/anuncios/getAllAnuncios',
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

export async function fetchBookDetails(bookId: number) {
  try {
    const res = await api({
      path: `/anuncios/getAnuncioById/${bookId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar detalhes do livro:', error);
    return null;
  }
}

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
    const path = queryString ? `/anuncios/search?${queryString}` : '/anuncios/getAllAnuncios';

    const res = await api({
      path,
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
