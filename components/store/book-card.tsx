import { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '../ui/text';
import { router } from 'expo-router';
import { Heart, ShoppingCart } from 'lucide-react-native';
import type { BookListing } from '@/types/interfaces';

interface BookCardProps {
  book: BookListing;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  currencyPrefix?: string;
}

export function BookCard({ book, currencyPrefix = '$', onAddToCart }: BookCardProps) {
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    router.push(`/book/${book.id}` as any);
  };

  const handleToggleLike = () => setLiked((v) => !v);
  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart();
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <View
        className="w-full overflow-hidden rounded-lg border border-border"
        style={{
          height: 310,
        }}>
        <View>
          <Image
            source={
            { uri: book.imagem || 'https://img.freepik.com/vetores-gratis/capa-de-livro-em-branco-de-vetor-isolada-em-branco_1284-41904.jpg?semt=ais_hybrid&w=740&q=80'} 
            }
            resizeMode="cover"
            style={{
              width: '100%',
              aspectRatio: 3 / 4,
              backgroundColor: '#f8f9fa',
            }}
          />

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation?.();
              handleToggleLike();
            }}
            activeOpacity={0.8}
            className="absolute right-2 top-2">
            <View
              className="h-9 w-9 items-center justify-center rounded-full"
              style={{
                backgroundColor: liked ? 'rgba(254,242,248,0.95)' : 'rgba(255,255,255,0.9)',
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}>
              <Heart
                size={18}
                color={liked ? '#a72861' : '#6b7280'}
                fill={liked ? '#a72861' : 'none'}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-1 flex-col justify-between p-2">
          <View>
            <Text
              className="mb-0.5 text-xs font-medium text-foreground"
              numberOfLines={2}
              ellipsizeMode="tail">
              {book.titulo}
            </Text>

            {book.autor && (
              <Text
                className="mb-1 text-xs text-muted-foreground"
                numberOfLines={1}
                ellipsizeMode="tail">
                {book.autor}
              </Text>
            )}
          </View>

          <View>
            <View className="flex-row items-center justify-between">
              <View>
                <View className="flex-row items-baseline gap-1">
                  <Text className="text-sm font-bold">
                    {currencyPrefix}
                    {book.preco}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
