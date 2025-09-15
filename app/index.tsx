import { BookCard } from '@/components/store/book-card';
import books from '@/mock/books';
import { ScrollView, View, Dimensions } from 'react-native';

export default function Screen() {
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const padding = 16;
  const gap = 8;
  const itemWidth = (screenWidth - padding - gap * (numColumns - 1)) / numColumns;

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-2">
        <View className="flex-row flex-wrap" style={{ gap: 8 }}>
          {books.map((book) => (
            <View
              key={book.id}
              style={{
                width: itemWidth,
                marginBottom: 8,
              }}>
              <BookCard
                id={book.id}
                imageUrl={book.imageUrl}
                name={book.name}
                author={book.author}
                originalPrice={book.originalPrice}
                salePrice={book.salePrice}
                currencyPrefix="R$"
                onAddToCart={() => console.log}
                onBuyNow={() => console.log}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
