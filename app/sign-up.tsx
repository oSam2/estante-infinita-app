import { SignUpForm } from '@/components/sign-up-form';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';

// const LOGO = {
//   light: require('@/assets/images/react-native-reusables-light.png'),
//   dark: require('@/assets/images/react-native-reusables-dark.png'),
// };

// const IMAGE_STYLE: ImageStyle = {
//   height: 76,
//   width: 76,
// };

export default function Signup() {
  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe"
        keyboardDismissMode="interactive">
        <View className="w-full max-w-sm">
          <SignUpForm />
        </View>
      </ScrollView>
    </View>
  );
}
