import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { TopBar } from '@/components/top-bar';
import { UserInfo } from '@/components/profile/user-info';
import { UserListings } from '@/components/profile/user-listings';
import { LogoutButton } from '@/components/profile/logout-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { router } from 'expo-router';
import Loading from '../loading';
import { useUser } from '@/hooks/useUser';

export default function ProfileScreen() {
  const [value, setValue] = useState('ativos');

  const handleListingPress = (listingId: number) => {
    router.push(`/book/${listingId}`);
  };

  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !user) {
    return <Text>Erro ao carregar dados do usuário</Text>;
  }

  return (
    <View className="flex-1 bg-background">
      <TopBar title="Perfil" showBackButton={true} showThemeToggle={true} />
      <ScrollView>
        <UserInfo user={user} />
        <View className="px-4">
          <Tabs value={value} onValueChange={setValue}>
            <TabsList className="mt-4">
              <TabsTrigger value="ativos">
                <Text>Anúncios</Text>
              </TabsTrigger>
              {/* <TabsTrigger value="inativos">
                <Text>Vendidos </Text>
              </TabsTrigger> */}
            </TabsList>

            <TabsContent value="ativos">
              <View className="py-2">
                <UserListings userId={user.id} handleListingPress={handleListingPress} />
              </View>
            </TabsContent>
          </Tabs>
        </View>
        <LogoutButton />
      </ScrollView>
    </View>
  );
}
