import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text } from '@/components/ui/text';
import { TopBar } from '@/components/top-bar';
import { UserInfo } from '@/components/profile/user-info';
import { UserListings } from '@/components/profile/user-listings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUserListings } from '@/mock/user';
import { router } from 'expo-router';
import { useFetch } from '@/hooks/useFetch';
import type { User } from '@/types/interfaces';
import Loading from './loading';

export default function ProfileScreen() {
  const [value, setValue] = useState('ativos');
  const activeListings = mockUserListings.filter((listing) => listing.status === 'ATIVO');
  const inactiveListings = mockUserListings.filter((listing) => listing.status === 'VENDIDO');

  const handleListingPress = (listingId: number) => {
    router.push(`/book/${listingId}`);
  };

  const { data, isLoading, isError } = useFetch<User>('users/me');

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <Text>Erro ao carregar dados do usuário</Text>;
  }

  return (
    <View className="flex-1 bg-background">
      <TopBar title="Perfil" showBackButton={true} showThemeToggle={true} />
      <ScrollView>
        <UserInfo user={data} />
        <View className="px-4">
          <Tabs value={value} onValueChange={setValue}>
            <TabsList className="mt-4">
              <TabsTrigger value="ativos">
                <Text>Ativos ({activeListings.length})</Text>
              </TabsTrigger>
              {/* <TabsTrigger value="inativos">
                <Text>Vendidos ({inactiveListings.length})</Text>
              </TabsTrigger> */}
            </TabsList>

            <TabsContent value="ativos">
              <View className="py-2">
                <UserListings userId={data.id} handleListingPress={handleListingPress} />
              </View>
            </TabsContent>
          </Tabs>
        </View>
      </ScrollView>
    </View>
  );
}
