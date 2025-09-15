import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '../ui/text';
import { router } from 'expo-router';

interface BookCardProps {
  id: string;
  imageUrl?: string;
  tagText?: string;
  name?: string;
  author?: string;
  originalPrice?: number;
  salePrice?: number;
  rating?: number;
  reviewCount?: number;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  currencyPrefix?: string;
}

export function BookCard({
  id,
  imageUrl,
  name,
  author,
  originalPrice = 299,
  salePrice = 249,
  currencyPrefix = '$',
}: BookCardProps) {
  // const savePercentage = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  const handlePress = () => {
    router.push(`/book/${id}` as any);
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <View
        className="w-full overflow-hidden rounded-lg"
        style={{
          height: 310,
        }}>
        <View>
          <Image
            source={{ uri: imageUrl }}
            className="w-full"
            resizeMode="cover"
            style={{
              aspectRatio: 3 / 4,
              // height: 200,
              backgroundColor: '#f8f9fa',
            }}
          />
        </View>
        <View className="p-2">
          <Text
            className="mb-0.5 text-xs font-medium text-foreground"
            numberOfLines={2}
            ellipsizeMode="tail">
            {name}
          </Text>

          {author && (
            <Text
              className="mb-1 text-xs text-muted-foreground"
              numberOfLines={1}
              ellipsizeMode="tail">
              {author}
            </Text>
          )}

          <View>
            <View className="flex-row items-baseline">
              <Text className="mr-1 text-xs text-muted-foreground line-through">
                {currencyPrefix}
                {originalPrice}
              </Text>
              <Text className="text-sm font-bold">
                {currencyPrefix}
                {salePrice}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
