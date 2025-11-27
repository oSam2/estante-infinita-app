import { Stack } from 'expo-router';
import { View } from 'react-native';
import BottomBar from '@/components/bottom-bar';

export default function TabsLayout() {
  return (
    <View className="flex-1 bg-background">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="search" />
        <Stack.Screen name="create-listing" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="book/[id]" />
      </Stack>
      <BottomBar />
    </View>
  );
}
