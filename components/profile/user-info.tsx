import { Edit, User } from 'lucide-react-native';
import { View } from 'react-native';
import { Text } from '../ui/text';
import type { User as UserType } from '@/types/interfaces';

export function UserInfo({ user }: { user: UserType | undefined }) {
  if (!user) return null;

  return (
    <View className="bg-primary/5 px-4 py-6">
      <View className="items-center">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <User size={32} className="text-primary" />
        </View>
        <View className="mb-1 mt-1 items-center gap-1">
          <Text className="text-xl font-bold text-foreground">{user.nome}</Text>
          <Text className="text-muted-foreground">{user.email}</Text>
          <Edit size={16} className="text-primary" />
        </View>
      </View>
    </View>
  );
}
