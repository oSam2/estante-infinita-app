import { View } from 'react-native';
import { Text } from '../ui/text';
import {
  getAdTypeLabelFromString,
  getConditionLabelFromString,
  getGenreLabelFromString,
} from '@/utils/book';
import { Star } from 'lucide-react-native';
import type { BookListingDetails } from '@/types/interfaces';

export function ListingDetails({ book }: { book: BookListingDetails | undefined }) {
  if (!book) {
    return null;
  }

  return (
    <View className="p-4">
      <Text className="mb-2 text-2xl font-bold text-foreground">{book.titulo}</Text>
      <Text className="mb-4 text-lg text-muted-foreground">por {book.autor}</Text>

      <View className="mb-6">
        <View className="mb-2 flex-row items-baseline">
          <Text className="text-3xl font-bold text-green-600">R$ {book.preco}</Text>
        </View>
        <View className="flex-row items-center"></View>
      </View>

      <View className="mb-4 rounded-lg bg-blue-50 p-3">
        <Text className="font-medium text-blue-800">
          {getConditionLabelFromString(book.condicao)}
        </Text>
      </View>

      <View className="mb-4 rounded-lg bg-green-50 p-3">
        <Text className="font-medium text-green-800">{getAdTypeLabelFromString(book.tipo)}</Text>
      </View>

      <View className="mb-6 rounded-lg bg-gray-50 p-4">
        <Text className="mb-3 text-lg font-semibold">Anúncio de: </Text>
        <View className="flex-row items-start justify-between">
          <View className="mr-3 flex-1">
            <Text className="font-medium text-foreground">{book.usuario.nome}</Text>
            <View className="mt-1 flex-row items-center">
              <Star size={14} fill="#fbbf24" color="#fbbf24" />
            </View>
          </View>
        </View>
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-lg font-semibold">Descrição</Text>
        <Text className="leading-6 text-muted-foreground">{book.descricao}</Text>
      </View>

      <View className="mb-6">
        <Text className="mb-3 text-lg font-semibold">Detalhes</Text>
        <View className="space-y-2">
          <View className="flex-row justify-between border-b border-border py-2">
            <Text className="text-muted-foreground">Editora</Text>
            <Text className="font-medium">{book.editora}</Text>
          </View>
          <View className="flex-row justify-between border-b border-border py-2">
            <Text className="text-muted-foreground">Gênero</Text>
            <Text className="font-medium">{getGenreLabelFromString(book.genero)}</Text>
          </View>
          <View className="flex-row justify-between py-2">
            <Text className="text-muted-foreground">ISBN</Text>
            <Text className="font-medium">{book.isbn ?? 'N/A'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
