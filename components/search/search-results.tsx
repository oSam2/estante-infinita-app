import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { BookListing as BookListingComponent } from '@/components/store/book-listing';
import type { BookListing } from '@/types/interfaces';
import { BookOpen } from 'lucide-react-native';

interface SearchResultsProps {
  results: BookListing[];
  searchQuery: string;
  onBookPress: (bookId: number) => void;
}

export function SearchResults({ results, searchQuery, onBookPress }: SearchResultsProps) {
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const padding = 16;
  const gap = 8;
  const itemWidth = (screenWidth - padding - gap * (numColumns - 1)) / numColumns;

  // Estado inicial - sem busca ainda
  if (searchQuery === '' && results.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-6 py-20">
        <View className="items-center">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-muted">
            <BookOpen size={40} className="text-muted-foreground" />
          </View>
          <Text className="mb-2 text-center text-lg font-semibold text-foreground">
            Encontre seu livro ideal
          </Text>
          <Text className="text-center text-sm text-muted-foreground">
            Use a barra de busca acima para encontrar livros por título, autor, gênero ou ISBN
          </Text>
        </View>
      </View>
    );
  }

  // Nenhum resultado encontrado
  if (results.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-6 py-20">
        <View className="items-center">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-muted">
            <BookOpen size={40} className="text-muted-foreground" />
          </View>
          <Text className="mb-2 text-center text-lg font-semibold text-foreground">
            Nenhum resultado encontrado
          </Text>
          <Text className="text-center text-sm text-muted-foreground">
            Tente ajustar sua busca ou filtros para encontrar o que procura
          </Text>
        </View>
      </View>
    );
  }

  // Resultados encontrados
  return (
    <View className="flex-1 bg-background">
      <View className="px-4 py-3">
        <Text className="text-sm text-muted-foreground">
          {results.length}{' '}
          {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </Text>
      </View>
      <View className="px-2">
        <BookListingComponent books={results} itemWidth={itemWidth} />
      </View>
    </View>
  );
}
