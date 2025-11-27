import type { BookListing as BookListingType } from '@/types/interfaces';
import { View } from 'react-native';
import { BookCard } from './book-card';

export function BookListing({
  books,
  itemWidth,
}: {
  books: BookListingType[] | undefined;
  itemWidth: number;
}) {
  if (!books) return null;
  return (
    <View className="flex-row flex-wrap" style={{ gap: 8 }}>
      {books.map((book) => (
        <View
          key={book.id}
          style={{
            width: itemWidth,
            marginBottom: 8,
          }}>
          <BookCard
            book={book}
            currencyPrefix="R$"
            onAddToCart={() => console.log}
            onBuyNow={() => console.log}
          />
        </View>
      ))}
    </View>
  );
}
