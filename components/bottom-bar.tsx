import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from './ui/text';
import { Home, Search, User, PlusCircle } from 'lucide-react-native';
import { router } from 'expo-router';

interface BottomBarProps {
  onHomePress?: () => void;
  onSearchPress?: () => void;
  onProfilePress?: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onHomePress, onSearchPress, onProfilePress }) => {
  const handleCreateListing = () => {
    router.push('/create-listing');
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      router.push('/profile');
    }
  };

  const handleSearchPress = () => {
    if (onSearchPress) {
      onSearchPress();
    } else {
      router.push('/search');
    }
  };

  return (
    <View className="flex-row items-center justify-around border-t border-border bg-background py-3">
      <TouchableOpacity className="flex-1 items-center justify-center" onPress={onHomePress}>
        <Home size={24} className="text-foreground" />
        <Text className="mt-1 text-xs text-foreground">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 items-center justify-center" onPress={handleSearchPress}>
        <Search size={24} className="text-foreground" />
        <Text className="mt-1 text-xs text-foreground">Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center justify-center"
        onPress={handleCreateListing}>
        <PlusCircle size={24} className="text-primary" />
        <Text className="mt-1 text-xs text-primary">Anunciar</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 items-center justify-center" onPress={handleProfilePress}>
        <User size={24} className="text-foreground" />
        <Text className="mt-1 text-xs text-foreground">Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
