import { CreateListingForm } from '@/components/create-listing-form';
import { TopBar } from '@/components/top-bar';
import { View } from 'react-native';

export default function CreateListing() {
  return (
    <View className="flex-1">
      <TopBar title="Anunciar Livro" showCartButton={false} showBackButton />
      <CreateListingForm />
    </View>
  );
}
