import { View, ScrollView, Image, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MapPin, Star } from 'lucide-react-native';
import books from '@/mock/books';

const { width: screenWidth } = Dimensions.get('window');

export default function bookDetails() {
  const { id } = useLocalSearchParams();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg">Produto não encontrado</Text>
      </View>
    );
  }

  const savePercentage = Math.round(
    ((book.originalPrice - book.salePrice) / book.originalPrice) * 100
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1 bg-background">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="items-center bg-gray-50 py-6">
            <Image
              source={{ uri: book.imageUrl }}
              style={{
                width: screenWidth * 0.6,
                aspectRatio: 3 / 4,
              }}
              resizeMode="cover"
              className="rounded-lg shadow-lg"
            />
          </View>
          <View className="p-4">
            <Text className="mb-2 text-2xl font-bold text-foreground">{book.name}</Text>
            <Text className="mb-4 text-lg text-muted-foreground">por {book.author}</Text>
            <View className="mb-6">
              <View className="mb-2 flex-row items-baseline">
                <Text className="mr-2 text-lg text-muted-foreground line-through">
                  R$ {book.originalPrice.toFixed(2)}
                </Text>
                <Text className="text-3xl font-bold text-green-600">
                  R$ {book.salePrice.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 rounded bg-green-100 px-2 py-1">
                  <Text className="text-sm font-medium text-green-700">-{savePercentage}% OFF</Text>
                </View>
                <Text className="text-sm text-green-600">
                  Economia de R$ {(book.originalPrice - book.salePrice).toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="mb-4 rounded-lg bg-blue-50 p-3">
              <Text className="font-medium text-blue-800">{book.condition}</Text>
            </View>
            <View className="mb-6 rounded-lg bg-gray-50 p-4">
              <Text className="mb-2 text-lg font-semibold">Vendido por</Text>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="font-medium text-foreground">{book.seller.name}</Text>
                  <View className="mt-1 flex-row items-center">
                    <MapPin size={14} color="#6b7280" />
                    <Text className="ml-1 text-sm text-muted-foreground">
                      {book.seller.location}
                    </Text>
                  </View>
                  <View className="mt-1 flex-row items-center">
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    <Text className="ml-1 text-sm text-muted-foreground">
                      {book.seller.conditionNotes} vendas
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="mb-6">
              <Text className="mb-2 text-lg font-semibold">Descrição</Text>
              <Text className="leading-6 text-muted-foreground">{book.description}</Text>
            </View>
            <View className="mb-6">
              <Text className="mb-3 text-lg font-semibold">Detalhes</Text>
              <View className="space-y-2">
                <View className="flex-row justify-between border-b border-border py-2">
                  <Text className="text-muted-foreground">Páginas</Text>
                  <Text className="font-medium">{book.pages}</Text>
                </View>
                <View className="flex-row justify-between border-b border-border py-2">
                  <Text className="text-muted-foreground">Editora</Text>
                  <Text className="font-medium">{book.publisher}</Text>
                </View>
                <View className="flex-row justify-between border-b border-border py-2">
                  <Text className="text-muted-foreground">Ano</Text>
                  <Text className="font-medium">{book.year}</Text>
                </View>
                <View className="flex-row justify-between border-b border-border py-2">
                  <Text className="text-muted-foreground">Idioma</Text>
                  <Text className="font-medium">{book.language}</Text>
                </View>
                <View className="flex-row justify-between py-2">
                  <Text className="text-muted-foreground">ISBN</Text>
                  <Text className="font-medium">{book.isbn}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Botões fixos na parte inferior */}
        <View className="border-t border-border bg-background p-4">
          <View className="flex-row space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onPress={() => console.log('Adicionar ao carrinho:', book.name)}>
              <Text>Adicionar ao carrinho</Text>
            </Button>
            <Button
              className="flex-1 bg-blue-600"
              onPress={() => console.log('Comprar agora:', book.name)}>
              <Text className="font-semibold text-white">Comprar agora</Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  );
}
