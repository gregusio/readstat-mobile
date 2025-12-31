import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Book } from '@/src/constants/Book';

interface BookCardProps {
  book: Book;
  textColor: string;
  backgroundColor: string;
  onPress?: () => void;
}

export function BookCard({ book, textColor, backgroundColor, onPress }: BookCardProps) {
  return (
    <Pressable 
      style={[styles.bookCard, { backgroundColor, borderColor: textColor + '20' }]}
      onPress={onPress}
    >
      <View style={styles.row}>
        {book.coverImageUrl ? (
          <Image
            source={{ uri: book.coverImageUrl }}
            style={styles.cover}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.cover, styles.coverPlaceholder]}>
            <Text style={[styles.coverPlaceholderText, { color: textColor + '80' }]}>No Cover</Text>
          </View>
        )}

        <View style={styles.meta}>
          <Text style={[styles.title, { color: textColor }]}>
            {book.title || 'Untitled'}
          </Text>
          {book.authors && book.authors.length > 0 && (
            <Text style={[styles.authors, { color: textColor + 'CC' }]}>
              {book.authors.join(', ')}
            </Text>
          )}
          {book.status && (
            <Text style={[styles.status, { color: textColor + '99' }]}>
              {book.status}
            </Text>
          )}
          {book.rating !== undefined && (
            <Text style={[styles.rating, { color: textColor }]}>
              ⭐ {book.rating}/5
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bookCard: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cover: {
    width: 84,
    height: 112,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  coverPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPlaceholderText: {
    fontSize: 12,
  },
  meta: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  authors: {
    fontSize: 14,
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  rating: {
    fontSize: 14,
  },
});
