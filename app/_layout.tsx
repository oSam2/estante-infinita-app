import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { TopBar } from '@/components/top-bar';
import { View } from 'react-native';
import { Stack } from 'expo-router';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View className="flex-1 bg-background">
        <TopBar
          onMenuPress={() => console.log('Menu pressionado')}
          onSearchPress={() => console.log('Busca pressionado')}
          onCartPress={() => console.log('Carrinho pressionado')}
        />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="sign-up" />
          {/* <Stack.Screen name="login" /> */}
          <Stack.Screen name="book/[id]" />
        </Stack>
        <PortalHost />
      </View>
    </ThemeProvider>
  );
}
