import { BookListing } from '@/components/store/book-listing';
import { TopBar } from '@/components/top-bar';
import { Text } from '@/components/ui/text';

import { ScrollView, View, Dimensions } from 'react-native';
import Loading from '../loading';
import { useBooks } from '@/hooks/useBooks';

export default function Screen() {
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const padding = 16;
  const gap = 8;
  const itemWidth = (screenWidth - padding - gap * (numColumns - 1)) / numColumns;

  const { books, isLoading, error } = useBooks();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Erro ao carregar livros</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Estante Infinita" />
      <ScrollView className="bg-background" style={{ flex: 1 }}>
        <View className="p-2">
          <BookListing books={books} itemWidth={itemWidth} />
        </View>
      </ScrollView>
    </View>
  );
}
