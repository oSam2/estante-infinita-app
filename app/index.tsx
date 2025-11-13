import { BookListing } from '@/components/store/book-listing';
import { TopBar } from '@/components/top-bar';
import { Text } from '@/components/ui/text';
import { useFetch } from '@/hooks/useFetch';
import type { BookListing as BookListingType } from '@/types/interfaces';

import { ScrollView, View, Dimensions } from 'react-native';
import Loading from './loading';

export default function Screen() {
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const padding = 16;
  const gap = 8;
  const itemWidth = (screenWidth - padding - gap * (numColumns - 1)) / numColumns;

  const {
    data: books,
    isLoading,
    isError,
  } = useFetch<BookListingType[]>('/anuncios/getAllAnuncios');

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Erro ao carregar livros</Text>
      </View>
    );
  }

  return (
    <View>
      <TopBar title="Estante Infinita" showMenuButton={true} showThemeToggle={true} />
      <ScrollView className="flex-1 bg-background">
        <View className="p-2">
          <BookListing books={books} itemWidth={itemWidth} />
        </View>
      </ScrollView>
    </View>
  );
}
