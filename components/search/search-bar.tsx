import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Search, X, Filter } from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';
import type { BookListing } from '@/types/interfaces';
import { Icon } from '../ui/icon';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
  selectedCondition: string | null;
  onConditionChange: (condition: string | null) => void;
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  onClearFilters: () => void;
  allBooks: BookListing[];
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedCondition,
  onConditionChange,
  selectedType,
  onTypeChange,
  onClearFilters,
  allBooks,
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const availableGenres = React.useMemo(() => {
    const genres = new Set(allBooks.map((book) => book.genero).filter(Boolean));
    return Array.from(genres).sort();
  }, [allBooks]);


  const availableConditions = React.useMemo(() => {
    const conditions = new Set(allBooks.map((book) => book.condicao).filter(Boolean));
    return Array.from(conditions).sort();
  }, [allBooks]);


  const availableTypes = React.useMemo(() => {
    const types = new Set(allBooks.map((book) => book.tipo).filter(Boolean));
    return Array.from(types).sort();
  }, [allBooks]);

  const hasActiveFilters = selectedGenre || selectedCondition || selectedType;

  return (
    <View className="border-b border-border bg-background">
      {/* Barra de busca */}
      <View className="px-4 py-3">
        <View className="flex-row items-center rounded-lg border border-border bg-muted/50 px-3 py-2">
          <Icon as={Search} size={20} className="text-muted-foreground" />
          <TextInput
            className="ml-2 flex-1 text-base text-foreground"
            placeholder="Buscar por título, autor, gênero..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={onSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => onSearchChange('')} className="ml-2">
              <X size={20} className="text-muted-foreground" />
            </TouchableOpacity>
          )}
        </View>

        {/* Botão de filtros */}
        <View className="mt-3 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className="flex-row items-center rounded-md bg-muted px-3 py-2">
            <Icon as={Filter} size={20} className="text-foreground" />
            <Text className="ml-2 text-sm font-medium">Filtros</Text>
            {hasActiveFilters && <View className="ml-2 h-2 w-2 rounded-full bg-primary" />}
          </TouchableOpacity>

          {hasActiveFilters && (
            <TouchableOpacity onPress={onClearFilters}>
              <Text className="text-sm text-primary">Limpar filtros</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Painel de filtros expansível */}
      {showFilters && (
        <View className="border-t border-border px-4 py-4">
          {/* Filtro de Gênero */}
          {availableGenres.length > 0 && (
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-foreground">Gênero</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {availableGenres.map((genre) => (
                    <TouchableOpacity
                      key={genre}
                      onPress={() => onGenreChange(selectedGenre === genre ? null : genre)}
                      className={`rounded-full border px-4 py-2 ${
                        selectedGenre === genre
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-background'
                      }`}>
                      <Text
                        className={`text-sm ${
                          selectedGenre === genre ? 'text-primary' : 'text-foreground'
                        }`}>
                        {genre}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Filtro de Condição */}
          {availableConditions.length > 0 && (
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-foreground">Condição</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {availableConditions.map((condition) => (
                    <TouchableOpacity
                      key={condition}
                      onPress={() =>
                        onConditionChange(selectedCondition === condition ? null : condition)
                      }
                      className={`rounded-full border px-4 py-2 ${
                        selectedCondition === condition
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-background'
                      }`}>
                      <Text
                        className={`text-sm ${
                          selectedCondition === condition ? 'text-primary' : 'text-foreground'
                        }`}>
                        {condition}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Filtro de Tipo */}
          {availableTypes.length > 0 && (
            <View>
              <Text className="mb-2 text-sm font-medium text-foreground">Tipo de Anúncio</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {availableTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => onTypeChange(selectedType === type ? null : type)}
                      className={`rounded-full border px-4 py-2 ${
                        selectedType === type
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-background'
                      }`}>
                      <Text
                        className={`text-sm ${
                          selectedType === type ? 'text-primary' : 'text-foreground'
                        }`}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
