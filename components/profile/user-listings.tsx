import { Image, TouchableOpacity, View, Alert } from 'react-native';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { getAdTypeLabelFromString } from '@/utils/book';
import { Badge } from '../ui/badge';
import { Trash2, Power, Pencil } from 'lucide-react-native';
import { useState } from 'react';
import Loading from '@/app/loading';
import { useUserBooks } from '@/hooks/useUserBooks';
import { router } from 'expo-router';
import { Icon } from '../ui/icon';

export function UserListings({
  userId,
  handleListingPress,
}: {
  userId: number;
  handleListingPress: (listingId: number) => void;
}) {
  const { userBooks, isLoading, error, deleteListing, toggleListingStatus } = useUserBooks(userId);

  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  const [togglingIds, setTogglingIds] = useState<number[]>([]);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !userBooks) {
    return <Text>Error ao carregar anúncios do usuário</Text>;
  }

  const handleDeleteListing = (listingId: number, title: string) => {
    Alert.alert('Excluir anúncio', `Tem certeza que deseja excluir o anúncio "${title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          setDeletingIds((prev) => [...prev, listingId]);
          try {
            await deleteListing(listingId);
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o anúncio');
          } finally {
            setDeletingIds((prev) => prev.filter((id) => id !== listingId));
          }
        },
      },
    ]);
  };

  const handleToggleStatus = (listingId: number, title: string, currentStatus: boolean) => {
    const action = currentStatus ? 'inativar' : 'ativar';
    Alert.alert(
      `${currentStatus ? 'Inativar' : 'Ativar'} anúncio`,
      `Tem certeza que deseja ${action} o anúncio "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: currentStatus ? 'Inativar' : 'Ativar',
          style: currentStatus ? 'destructive' : 'default',
          onPress: async () => {
            setTogglingIds((prev) => [...prev, listingId]);
            try {
              await toggleListingStatus(listingId, !currentStatus);
            } catch (error) {
              Alert.alert('Erro', `Não foi possível ${action} o anúncio`);
            } finally {
              setTogglingIds((prev) => prev.filter((id) => id !== listingId));
            }
          },
        },
      ]
    );
  };

  const handleEditListing = (listingId: number) => {
    router.push(`/book/${listingId}?edit=true`);
  };

  return (
    <View>
      {userBooks.map((listing) => {
        const isDeleting = deletingIds.includes(listing.id);
        const isToggling = togglingIds.includes(listing.id);
        const isDisabled = isDeleting || isToggling;

        return (
          <View key={listing.id} className="mb-3">
            <Card className="p-4">
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => handleListingPress(listing.id)}
                  className="flex-1 flex-row"
                  disabled={isDisabled}>
                  <Image
                    source={{ uri: listing.imagem }}
                    className="mr-3 h-16 w-12 rounded bg-muted"
                  />
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
                        <Text>{listing.ativo ? 'Ativo' : 'Inativo'}</Text>
                      </Badge>
                    </View>
                  </View>
                </TouchableOpacity>

                <View className="ml-2 justify-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onPress={() => handleEditListing(listing.id)}
                    disabled={isDisabled}
                    className="h-8 w-8">
                    <Icon as={Pencil} size={16} className="text-foreground" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onPress={() => handleToggleStatus(listing.id, listing.titulo, listing.ativo)}
                    disabled={isDisabled}
                    className="h-8 w-8">
                    <Icon
                      as={Power}
                      size={16}
                      className={
                        isToggling
                          ? 'text-muted-foreground'
                          : listing.ativo
                            ? 'text-foreground'
                            : 'text-green-500'
                      }
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onPress={() => handleDeleteListing(listing.id, listing.titulo)}
                    disabled={isDisabled}
                    className="h-8 w-8">
                    <Icon
                      as={Trash2}
                      size={16}
                      className={isDeleting ? 'text-muted-foreground' : 'text-red-500'}
                    />
                  </Button>
                </View>
              </View>
            </Card>
          </View>
        );
      })}

      {userBooks.length === 0 && (
        <View className="items-center py-8">
          <Text className="text-muted-foreground">Nenhum anúncio encontrado</Text>
        </View>
      )}
    </View>
  );
}
