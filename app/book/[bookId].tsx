import React, { useState } from "react";
import { View, Text, StyleSheet, useColorScheme, Pressable, ScrollView, Image, Alert } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import { useBookStore } from "@/src/store/bookStore";
import { EditBookModal } from "@/src/components/EditBookModal";

export default function BookDetails() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { bookId } = useLocalSearchParams<{ bookId?: string }>();
  const router = useRouter();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const book = useBookStore((state) =>
    state.books.find((b) => b.id === bookId)
  );
  const removeBook = useBookStore((state) => state.removeBook);

  const handleDeleteBook = () => {
    Alert.alert(
      "Delete Book",
      `Are you sure you want to delete "${book?.title}"?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            if (book?.id) {
              removeBook(book.id);
              router.back();
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderRow = (label: string, value?: string | number | string[]) => {
    if (value === undefined || value === null) return null;
    const display = Array.isArray(value)
      ? value.length > 0
        ? value.join(", ")
        : null
      : `${value}`;
    if (!display) return null;

    return (
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.text }]}>{display}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Books",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}
            >
              <Ionicons name="return-up-back" size={24} color={colors.primary} />
            </Pressable>
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <Pressable
                onPress={() => setEditModalVisible(true)}
                style={({ pressed }) => [styles.editButton, pressed && { opacity: 0.6 }]}
              >
                <Ionicons name="pencil" size={24} color={colors.primary} />
              </Pressable>
              <Pressable
                onPress={handleDeleteBook}
                style={({ pressed }) => [styles.deleteButton, pressed && { opacity: 0.6 }]}
              >
                <Ionicons name="trash" size={24} color={colors.danger} />
              </Pressable>
            </View>
          ),
        }}
      />
      <EditBookModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        book={book}
        textColor={colors.text}
        backgroundColor={colors.background}
        tintColor={colors.primary}
      />
      {book ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.heroRow}>
            {book.coverImageUrl ? (
              <Image
                source={{ uri: book.coverImageUrl }}
                style={styles.cover}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.cover, styles.coverPlaceholder]}>
                <Text style={styles.coverPlaceholderText}>No Cover</Text>
              </View>
            )}
            <View style={styles.heroText}>
              <Text style={[styles.title, { color: colors.text }]}>{book.title}</Text>
              {book.authors?.length ? (
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                  {book.authors.join(", ")}
                </Text>
              ) : null}
            </View>
          </View>

          {book.description ? (
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Description</Text>
          ) : null}
          {book.description ? (
            <Text style={[styles.description, { color: colors.text }]}>
              {book.description}
            </Text>
          ) : (
            <Text style={[styles.placeholder, { color: colors.textSecondary }]}>No description available.</Text>
          )}

          {renderRow("ISBN", book.isbn)}
          {renderRow("Language", book.language)}
          {renderRow("Pages", book.pageCount)}
          {renderRow("Genres", book.genres)}
          {renderRow("Status", book.status)}
          {renderRow("Rating", book.rating)}
          {renderRow("Started", book.dateStarted)}
          {renderRow("Finished", book.dateFinished)}

          {book.review ? (
            <View style={styles.section}>
              <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Review</Text>
              <Text style={[styles.value, { color: colors.text }]}>{book.review}</Text>
            </View>
          ) : null}
        </ScrollView>
      ) : (
        <Text style={[styles.placeholder, { color: colors.textSecondary }]}>Book not found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  editButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  coverPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  coverPlaceholderText: {
    fontSize: 16,
    color: '#999',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  section: {
    marginTop: 12,
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  value: {
    fontSize: 16,
    lineHeight: 22,
  },
  placeholder: {
    fontSize: 16,
    marginBottom: 12,
  },
  cover: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginRight: 16,
    backgroundColor: "#ddd",
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroText: {
    flex: 1,
    justifyContent: 'center',
  },
});