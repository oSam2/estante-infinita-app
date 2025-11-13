import { GENERO, CONDICAO_LIVRO, TIPO_ANUNCIO } from '@/types/enum';

export const GENRE_LABELS: Record<GENERO, string> = {
  [GENERO.ACAO]: 'Ação',
  [GENERO.AVENTURA]: 'Aventura',
  [GENERO.COMEDIA]: 'Comédia',
  [GENERO.DRAMA]: 'Drama',
  [GENERO.FICCAO_CIENTIFICA]: 'Ficção Científica',
  [GENERO.FANTASIA]: 'Fantasia',
  [GENERO.ROMANCE]: 'Romance',
  [GENERO.SUSPENSE]: 'Suspense',
  [GENERO.TERROR]: 'Terror',
  [GENERO.BIOGRAFIA]: 'Biografia',
  [GENERO.HISTORIA]: 'História',
  [GENERO.AUTOAJUDA]: 'Autoajuda',
  [GENERO.SAUDE]: 'Saúde',
  [GENERO.NEGOCIOS]: 'Negócios',
  [GENERO.TECNOLOGIA]: 'Tecnologia',
  [GENERO.ARTES]: 'Artes',
  [GENERO.CULINARIA]: 'Culinária',
  [GENERO.VIAGENS]: 'Viagens',
  [GENERO.RELIGIAO]: 'Religião',
  [GENERO.POESIA]: 'Poesia',
};

export const CONDITION_LABELS: Record<CONDICAO_LIVRO, string> = {
  [CONDICAO_LIVRO.NOVO]: 'Novo',
  [CONDICAO_LIVRO.SEMINOVO]: 'Seminovo',
  [CONDICAO_LIVRO.USADO]: 'Usado',
};

export const AD_TYPE_LABELS: Record<TIPO_ANUNCIO, string> = {
  [TIPO_ANUNCIO.VENDA]: 'Venda',
  [TIPO_ANUNCIO.TROCA]: 'Troca',
  [TIPO_ANUNCIO.DOACAO]: 'Doação',
};

export function getGenreString(genre: GENERO): string {
  const genreMap: Record<GENERO, string> = {
    [GENERO.ACAO]: 'ACAO',
    [GENERO.AVENTURA]: 'AVENTURA',
    [GENERO.COMEDIA]: 'COMEDIA',
    [GENERO.DRAMA]: 'DRAMA',
    [GENERO.FICCAO_CIENTIFICA]: 'FICCAO_CIENTIFICA',
    [GENERO.FANTASIA]: 'FANTASIA',
    [GENERO.ROMANCE]: 'ROMANCE',
    [GENERO.SUSPENSE]: 'SUSPENSE',
    [GENERO.TERROR]: 'TERROR',
    [GENERO.BIOGRAFIA]: 'BIOGRAFIA',
    [GENERO.HISTORIA]: 'HISTORIA',
    [GENERO.AUTOAJUDA]: 'AUTOAJUDA',
    [GENERO.SAUDE]: 'SAUDE',
    [GENERO.NEGOCIOS]: 'NEGOCIOS',
    [GENERO.TECNOLOGIA]: 'TECNOLOGIA',
    [GENERO.ARTES]: 'ARTES',
    [GENERO.CULINARIA]: 'CULINARIA',
    [GENERO.VIAGENS]: 'VIAGENS',
    [GENERO.RELIGIAO]: 'RELIGIAO',
    [GENERO.POESIA]: 'POESIA',
  };
  return genreMap[genre];
}

export function getConditionString(condition: CONDICAO_LIVRO): string {
  const conditionMap: Record<CONDICAO_LIVRO, string> = {
    [CONDICAO_LIVRO.NOVO]: 'NOVO',
    [CONDICAO_LIVRO.SEMINOVO]: 'SEMINOVO',
    [CONDICAO_LIVRO.USADO]: 'USADO',
  };
  return conditionMap[condition];
}

export function getAdTypeString(type: TIPO_ANUNCIO): string {
  const typeMap: Record<TIPO_ANUNCIO, string> = {
    [TIPO_ANUNCIO.VENDA]: 'VENDA',
    [TIPO_ANUNCIO.TROCA]: 'TROCA',
    [TIPO_ANUNCIO.DOACAO]: 'DOACAO',
  };
  return typeMap[type];
}

// Funções para converter strings do backend para labels legíveis
export function getGenreLabelFromString(genreString: string): string {
  const genreMap: Record<string, string> = {
    ACAO: 'Ação',
    AVENTURA: 'Aventura',
    COMEDIA: 'Comédia',
    DRAMA: 'Drama',
    FICCAO_CIENTIFICA: 'Ficção Científica',
    FANTASIA: 'Fantasia',
    ROMANCE: 'Romance',
    SUSPENSE: 'Suspense',
    TERROR: 'Terror',
    BIOGRAFIA: 'Biografia',
    HISTORIA: 'História',
    AUTOAJUDA: 'Autoajuda',
    SAUDE: 'Saúde',
    NEGOCIOS: 'Negócios',
    TECNOLOGIA: 'Tecnologia',
    ARTES: 'Artes',
    CULINARIA: 'Culinária',
    VIAGENS: 'Viagens',
    RELIGIAO: 'Religião',
    POESIA: 'Poesia',
  };
  return genreMap[genreString] || genreString;
}

export function getConditionLabelFromString(conditionString: string): string {
  const conditionMap: Record<string, string> = {
    NOVO: 'Novo',
    SEMINOVO: 'Seminovo',
    USADO: 'Usado',
  };
  return conditionMap[conditionString] || conditionString;
}

export function getAdTypeLabelFromString(typeString: string): string {
  const typeMap: Record<string, string> = {
    VENDA: 'Venda',
    TROCA: 'Troca',
    DOACAO: 'Doação',
  };
  return typeMap[typeString] || typeString;
}
