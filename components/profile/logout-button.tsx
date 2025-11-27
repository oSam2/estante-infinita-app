import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { View, Alert } from 'react-native';

export function LogoutButton() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            router.replace('/(auth)/sign-in');
          } catch (error) {
            Alert.alert('Erro', 'Erro ao sair');
          }
        },
      },
    ]);
  };

  return (
    <View className="px-4 pb-4">
      <Button variant="outline" onPress={handleLogout}>
        <Text>Sair da conta</Text>
      </Button>
    </View>
  );
}
