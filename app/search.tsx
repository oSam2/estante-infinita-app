import React, { useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { TopBar } from '@/components/top-bar';
import { SearchBar } from '@/components/search/search-bar';
import { Text } from '@/components/ui/text';
import { useFetch } from '@/hooks/useFetch';
import type { BookListing } from '@/types/interfaces';
import { router } from 'expo-router';
import { SearchResults } from '@/components/search/search-results';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const {
    data: allBooks,
    isLoading,
    isError,
  } = useFetch<BookListing[]>('/anuncios/getAllAnuncios');

  const filteredBooks = React.useMemo(() => {
    if (!allBooks) return [];
    // todo: melhorar..
    return allBooks.filter((book) => {
      const matchesSearch =
        searchQuery === '' ||
        book.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genero.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.editora?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (book.isbn?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

      const matchesGenre = !selectedGenre || book.genero === selectedGenre;
      const matchesCondition = !selectedCondition || book.condicao === selectedCondition;
      const matchesType = !selectedType || book.tipo === selectedType;

      return matchesSearch && matchesGenre && matchesCondition && matchesType;
    });
  }, [allBooks, searchQuery, selectedGenre, selectedCondition, selectedType]);

  const handleBookPress = (bookId: number) => {
    router.push(`/book/${bookId}`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedGenre(null);
    setSelectedCondition(null);
    setSelectedType(null);
  };

  if (isLoading) {
    return (
      <>
        <TopBar showBackButton={true} showThemeToggle={true} title="Buscar Livros" />
        <View className="flex-1 items-center justify-center bg-background">
          <ActivityIndicator size="large" />
          <Text className="mt-4 text-muted-foreground">Carregando...</Text>
        </View>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <TopBar showBackButton={true} showThemeToggle={true} title="Buscar Livros" />
        <View className="flex-1 items-center justify-center bg-background">
          <Text className="text-destructive">Erro ao carregar livros</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <TopBar showBackButton={true} showThemeToggle={true} title="Buscar Livros" />
      <View className="flex-1 bg-background">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          selectedCondition={selectedCondition}
          onConditionChange={setSelectedCondition}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          onClearFilters={handleClearFilters}
          allBooks={allBooks || []}
        />
        <ScrollView className="flex-1">
          <SearchResults
            results={filteredBooks}
            searchQuery={searchQuery}
            onBookPress={handleBookPress}
          />
        </ScrollView>
      </View>
    </>
  );
}
