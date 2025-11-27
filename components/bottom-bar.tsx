import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from './ui/text';
import { Home, Search, User, PlusCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { Icon } from './ui/icon';

interface BottomBarProps {
  onHomePress?: () => void;
  onSearchPress?: () => void;
  onProfilePress?: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onHomePress, onSearchPress, onProfilePress }) => {
  const handleCreateListing = () => {
    router.push('/(tabs)/create-listing');
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      router.push('/(tabs)/profile');
    }
  };

  const handleSearchPress = () => {
    if (onSearchPress) {
      onSearchPress();
    } else {
      router.push('/(tabs)/search');
    }
  };

  const handleHomePress = () => {
    if (onHomePress) {
      onHomePress();
    } else {
      router.push('/(tabs)/home');
    }
  };

  return (
    <View className="flex-row items-center justify-around border-t border-border bg-background py-3">
      <TouchableOpacity className="flex-1 items-center justify-center" onPress={handleHomePress}>
        <Icon as={Home} size={24} className="text-foreground" />
        <Text className="mt-1 text-xs text-foreground">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 items-center justify-center" onPress={handleSearchPress}>
        <Icon as={Search} size={24} className="text-foreground" />
        <Text className="mt-1 text-xs text-foreground">Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center justify-center"
        onPress={handleCreateListing}>
        <Icon as={PlusCircle} size={24} className="text-primary" />
        <Text className="mt-1 text-xs text-primary">Anunciar</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 items-center justify-center" onPress={handleProfilePress}>
        <Icon as={User} size={24} className="text-foreground" />
        <Text className="mt-1 text-xs text-foreground">Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
