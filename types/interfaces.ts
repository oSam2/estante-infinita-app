export interface BookListing {
  id: number;
  titulo: string;
  autor: string;
  editora?: string;
  isbn?: string;
  preco: number;
  genero: string;
  condicao: string;
  tipo: string;
  descricao?: string;
  imagem: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm?: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
}

export interface BookListingDetails extends BookListing {
  usuario: User;
  usuarioId: number;
}

export interface Comment {
  id: number;
  texto: string;
  usuario: User;
  anuncioId: string;
  usuarioId: number;
  criadoEm: string;
  atualizadoEm?: string;
}
