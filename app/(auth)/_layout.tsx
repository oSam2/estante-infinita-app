import { Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '../loading';

export default function AuthLayout() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}