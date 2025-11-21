import { View, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { TopBar } from '@/components/top-bar';
import { lazy, Suspense, useEffect, useState } from 'react';
import type { BookListingDetails, Comment } from '@/types/interfaces';
import { fetchBookDetails } from '@/actions/book';
import { CommentsSection } from '@/components/comments-section';
import { ListingDetails } from '@/components/store/listing-details';
import { useFetch } from '@/hooks/useFetch';
import Loading from '../loading';
import { Text } from '@/components/ui/text';
import { createComentario } from '@/actions/comment';
import { Alert } from 'react-native';
import { mutate } from 'swr';

const { width: screenWidth } = Dimensions.get('window');

export default function bookDetails() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);

  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleAddComment = async (commentText: string) => {
    setIsSubmittingComment(true);
    try {
      const res = await createComentario({ texto: commentText, anuncioId: id });
      if (res.status === 201) {
        // Revalidate comments list
        await mutate(`/comentarios/listByAnuncio/${id}`);
        return;
      }

      Alert.alert('Erro', res.data?.error || 'Não foi possível adicionar o comentário.');
    } catch (err: any) {
      console.error('Erro ao enviar comentário:', err);
      const message = err?.data?.error || err.message || 'Erro ao enviar comentário';
      Alert.alert('Erro', message);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const {
    data: book,
    isLoading,
    isError,
  } = useFetch<BookListingDetails>(`/anuncios/getAnuncioById/${id}`);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Erro ao carregar detalhes do livro</Text>
      </View>
    );
  }

  return (
    <>
      <TopBar showBackButton showThemeToggle={false} />
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
            listingId={id}
            onAddComment={handleAddComment}
            isSubmitting={isSubmittingComment}
          />
        </ScrollView>
      </View>
    </>
  );
}
