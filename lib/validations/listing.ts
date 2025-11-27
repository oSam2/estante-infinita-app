import { z } from 'zod';
import { CONDICAO_LIVRO, GENERO, TIPO_ANUNCIO } from '@/types/enum';

export const createListingSchema = z.object({
  titulo: z
    .string()
    .min(1, 'Título é obrigatório')
    .min(3, 'Título deve ter pelo menos 3 caracteres'),
  autor: z
    .string()
    .min(1, 'Autor é obrigatório')
    .min(2, 'Autor deve ter pelo menos 2 caracteres'),
  editora: z.string().optional(),
  isbn: z.string().optional(),
  preco: z.string().optional(),
  genero: z.nativeEnum(GENERO, {
    errorMap: () => ({ message: 'Selecione um gênero' }),
  }),
  condicao: z.nativeEnum(CONDICAO_LIVRO, {
    errorMap: () => ({ message: 'Selecione a condição do livro' }),
  }),
  tipo: z.nativeEnum(TIPO_ANUNCIO, {
    errorMap: () => ({ message: 'Selecione o tipo de anúncio' }),
  }),
  descricao: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  imageUri: z.string().nullable().optional(),
}).refine(
  (data) => {
    if (data.tipo === TIPO_ANUNCIO.VENDA) {
      return data.preco && data.preco.length > 0;
    }
    return true;
  },
  {
    message: 'Preço é obrigatório para venda',
    path: ['preco'],
  }
);

export type CreateListingFormData = z.infer<typeof createListingSchema>;
