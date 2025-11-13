import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ArrowLeft, Menu, MoonStarIcon, ShoppingCart, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Input } from './ui/input';

interface TopBarProps {
  title?: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  showCartButton?: boolean;
  showThemeToggle?: boolean;
  onMenuPress?: () => void;
  onCartPress?: () => void;
  forceBackButton?: boolean;
}

export function TopBar({
  title,
  showBackButton = false,
  showMenuButton = true,
  showCartButton = false,
  showThemeToggle = false,
  onMenuPress,
  onCartPress,
}: TopBarProps) {
  const { colorScheme } = useColorScheme();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View className="border-b border-border bg-background">
        <View style={{ height: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24 }} />
        <View className="min-h-[56px] flex-row items-center px-4 py-3">
          {/* Lado esquerdo */}
          <View className="flex-row items-center">
            {showBackButton && (
              <Button onPress={handleBackPress} size="icon" variant="ghost" className="mr-2">
                <Icon as={ArrowLeft} className="size-5 text-foreground" />
              </Button>
            )}
            {showMenuButton && !showBackButton && (
              <Button onPress={onMenuPress} size="icon" variant="ghost" className="mr-2">
                <Icon as={Menu} className="size-5 text-foreground" />
              </Button>
            )}
          </View>

          {title && (
            <View className="absolute inset-x-0 flex-1 items-center">
              <Text className="text-lg font-semibold text-foreground" numberOfLines={1}>
                {title}
              </Text>
            </View>
          )}

          {/* Lado direito */}
          <View className="ml-auto flex-row items-center">
            {showThemeToggle && <ThemeToggle />}

            {showCartButton && (
              <Button onPress={onCartPress} size="icon" variant="ghost" className="relative">
                <Icon as={ShoppingCart} className="size-5 text-foreground" />
                <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-red-500">
                  <Text className="text-xs font-bold text-white">2</Text>
                </View>
              </Button>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
