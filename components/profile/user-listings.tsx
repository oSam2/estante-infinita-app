import type { mockUserListings } from '@/mock/user';
import { Image, TouchableOpacity, View } from 'react-native';
import { Card } from '../ui/card';
import { Text } from '../ui/text';
import { getAdTypeLabelFromString } from '@/utils/book';
import { Badge } from '../ui/badge';
import { useFetch } from '@/hooks/useFetch';
import type { BookListingDetails } from '@/types/interfaces';
import Loading from '@/app/loading';

export function UserListings({
  userId,
  handleListingPress,
}: {
  userId: number;
  handleListingPress: (listingId: number) => void;
}) {
  const {
    data: listings,
    isLoading,
    isError,
  } = useFetch<BookListingDetails[]>(`/anuncios/getAnunciosByUser/${userId}`);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !listings) {
    return <Text>Error ao carregar anúncios do usuário</Text>;
  }

  return (
    <View>
      {listings.map((listing) => (
        <TouchableOpacity
          key={listing.id}
          onPress={() => handleListingPress(listing.id)}
          className="mb-3">
          <Card className="p-4">
            <View className="flex-row">
              <Image source={{ uri: listing.imagem }} className="mr-3 h-16 w-12 rounded bg-muted" />
              <View className="flex-1">
                <Text className="font-medium text-foreground" numberOfLines={1}>
                  {listing.titulo}
                </Text>
                <Text className="text-sm text-muted-foreground" numberOfLines={1}>
                  por {listing.autor}
                </Text>
                <View className="mt-2 flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="font-bold text-primary">R$ {listing.preco}</Text>
                    <Text
                      className={`mt-1 text-xs font-medium ${
                        listing.tipo === 'VENDA'
                          ? 'text-green-600'
                          : listing.tipo === 'TROCA'
                            ? 'text-blue-600'
                            : 'text-purple-600'
                      }`}>
                      {getAdTypeLabelFromString(listing.tipo)}
                    </Text>
                  </View>
                  <Badge variant={listing.ativo ? 'default' : 'secondary'}>
                    <Text>{listing.ativo ? 'Ativo' : 'Vendido'}</Text>
                  </Badge>
                </View>
                <Text className="mt-1 text-xs text-muted-foreground">
                  {/* {listing.visualizacoes} visualizações */}
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      {listings.length === 0 && (
        <View className="items-center py-8">
          <Text className="text-muted-foreground">Nenhum anúncio encontrado</Text>
        </View>
      )}
    </View>
  );
}
