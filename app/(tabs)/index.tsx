import { Colors } from "@/constants/Colors";
import { Text, useColorScheme, View, FlatList, StyleSheet } from "react-native";
import { useBookStore } from "@/hooks/bookStore";
import { Book } from "@/constants/Book";
import { useState } from "react";
import { BookCard } from "@/components/BookCard";
import { AddBookModal } from "@/components/AddBookModal";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { useRouter } from "expo-router";

export default function Index() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const books = useBookStore((state) => state.books);
  const router = useRouter();
  
  const [showModal, setShowModal] = useState(false);

  const handleBookPress = (book: Book) => {
    router.push(`/book/${book.id}`);
  };

  const renderBook = ({ item }: { item: Book }) => (
    <BookCard
      book={item}
      textColor={colors.text}
      backgroundColor={colors.background}
      onPress={() => handleBookPress(item)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {books.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={{ color: colors.text }}>No books yet. Add your first book!</Text>
        </View>
      ) : (
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <FloatingActionButton
        onPress={() => setShowModal(true)}
        backgroundColor={colors.tint}
      />

      <AddBookModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        textColor={colors.text}
        backgroundColor={colors.background}
        tintColor={colors.tint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
