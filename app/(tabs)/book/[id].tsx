import { View, ScrollView, Image, Dimensions } from 'react-native';
import { useLocalSearchParams} from 'expo-router';
import { TopBar } from '@/components/top-bar';
import { CommentsSection } from '@/components/comments-section';
import { ListingDetails } from '@/components/store/listing-details';

import Loading from '../../loading';
import { Text } from '@/components/ui/text';
import { useBook } from '@/hooks/useBook';

const { width: screenWidth } = Dimensions.get('window');

export default function BookDetails() {
  
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);

  const {
    book,
    isLoading,
    error,
  } = useBook(id);

  if (!id || isNaN(id)) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>ID do livro inválido</Text>
      </View>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error || !book) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Erro ao carregar detalhes do livro</Text>
      </View>
    );
  }

  return (
    <>
      <TopBar showBackButton showThemeToggle={false} title={book?.titulo} />
      <View className="flex-1 bg-background">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={true}>
          <View className="items-center bg-gray-50 py-6">
            <Image
              source={{ uri: book?.imagem }}
              style={{
                width: screenWidth * 0.6,
                aspectRatio: 3 / 4,
              }}
              resizeMode="cover"
              className="rounded-lg shadow-lg"
            />
          </View>
          <ListingDetails book={book} />

          <CommentsSection
            ownerId={book.usuarioId}
            listingId={id}
          />
        </ScrollView>
      </View>
    </>
  );
}
