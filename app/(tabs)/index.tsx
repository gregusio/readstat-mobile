import { Colors } from "@/src/constants/Colors";
import { Text, useColorScheme, View, FlatList, StyleSheet } from "react-native";
import { useBookStore } from "@/src/store/bookStore";
import { Book } from "@/src/constants/Book";
import { useState } from "react";
import { BookCard } from "@/src/components/BookCard";
import { AddBookModal } from "@/src/components/AddBookModal";
import { FloatingActionButton } from "@/src/components/FloatingActionButton";

export default function Index() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const books = useBookStore((state) => state.books);
  
  const [showModal, setShowModal] = useState(false);

  const renderBook = ({ item }: { item: Book }) => (
    <BookCard
      book={item}
      textColor={colors.text}
      backgroundColor={colors.background}
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
