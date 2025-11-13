import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Tipos de filtros disponíveis
export const BOOK_CATEGORIES = [
  { id: 'all', label: 'Todos', value: 'all' },
  { id: 'ficcao', label: 'Ficção', value: 'ficcao' },
  { id: 'nao-ficcao', label: 'Não Ficção', value: 'nao-ficcao' },
  { id: 'biografias', label: 'Biografias', value: 'biografias' },
  { id: 'academico', label: 'Acadêmico', value: 'academico' },
  { id: 'tecnico', label: 'Técnico', value: 'tecnico' },
] as const;

export const BOOK_CONDITIONS = [
  { id: 'all', label: 'Todos', value: 'all' },
  { id: 'novo', label: 'Novo', value: 'novo' },
  { id: 'usado', label: 'Usado', value: 'usado' },
] as const;

interface BookFiltersProps {
  selectedCategory: string;
  selectedCondition: string;
  onCategoryChange: (category: string) => void;
  onConditionChange: (condition: string) => void;
  totalBooks: number;
  filteredBooks: number;
}

export function BookFilters({
  selectedCategory,
  selectedCondition,
  onCategoryChange,
  onConditionChange,
  totalBooks,
  filteredBooks,
}: BookFiltersProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllConditions, setShowAllConditions] = useState(false);

  const visibleCategories = showAllCategories ? BOOK_CATEGORIES : BOOK_CATEGORIES.slice(0, 4);
  const visibleConditions = showAllConditions ? BOOK_CONDITIONS : BOOK_CONDITIONS.slice(0, 3);

  return (
    <View className="border-b border-border bg-background">
      <View className="px-4 py-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-foreground">Livros Disponíveis</Text>
          <Badge variant="secondary" className="px-2 py-1">
            <Text className="text-xs font-medium">
              {filteredBooks} de {totalBooks}
            </Text>
          </Badge>
        </View>
      </View>

      <Separator />
      <View className="px-4 py-3">
        <Text className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Categoria
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}>
          <View className="flex-row gap-2">
            {visibleCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                size="sm"
                onPress={() => onCategoryChange(category.value)}
                className="rounded-full">
                <Text
                  className={`text-xs font-medium ${
                    selectedCategory === category.value
                      ? 'text-primary-foreground'
                      : 'text-foreground'
                  }`}>
                  {category.label}
                </Text>
              </Button>
            ))}
            {BOOK_CATEGORIES.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setShowAllCategories(!showAllCategories)}
                className="rounded-full">
                <Text className="text-xs font-medium text-muted-foreground">
                  {showAllCategories ? 'Menos' : `+${BOOK_CATEGORIES.length - 4}`}
                </Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </View>

      <Separator />
      <View className="px-4 py-3">
        <Text className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Condição
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}>
          <View className="flex-row gap-2">
            {visibleConditions.map((condition) => (
              <Button
                key={condition.id}
                variant={selectedCondition === condition.value ? 'default' : 'outline'}
                size="sm"
                onPress={() => onConditionChange(condition.value)}
                className="rounded-full">
                <Text
                  className={`text-xs font-medium ${
                    selectedCondition === condition.value
                      ? 'text-primary-foreground'
                      : 'text-foreground'
                  }`}>
                  {condition.label}
                </Text>
              </Button>
            ))}
            {BOOK_CONDITIONS.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setShowAllConditions(!showAllConditions)}
                className="rounded-full">
                <Text className="text-xs font-medium text-muted-foreground">
                  {showAllConditions ? 'Menos' : `+${BOOK_CONDITIONS.length - 3}`}
                </Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </View>

      <Separator />
      {(selectedCategory !== 'all' || selectedCondition !== 'all') && (
        <View className="px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onPress={() => {
              onCategoryChange('all');
              onConditionChange('all');
            }}
            className="w-full">
            <Text className="text-sm font-medium text-muted-foreground">Limpar filtros</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
