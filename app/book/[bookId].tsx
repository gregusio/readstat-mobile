import React from "react";
import { View, Text, StyleSheet, useColorScheme, Pressable, ScrollView, Image } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import { useBookStore } from "@/src/store/bookStore";

export default function BookDetails() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { bookId } = useLocalSearchParams<{ bookId?: string }>();
  const router = useRouter();

  const book = useBookStore((state) =>
    state.books.find((b) => b.id === bookId)
  );

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
        }}
      />
      {book ? (
        <ScrollView>
          {book.coverImageUrl ? (
            <Image
              source={{ uri: book.coverImageUrl }}
              style={styles.cover}
              resizeMode="cover"
            />
          ) : null}
          <Text style={[styles.title, { color: colors.text }]}>{book.title}</Text>
          {book.authors?.length ? (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {book.authors.join(", ")}
            </Text>
          ) : null}

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
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
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
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#ddd",
  },
});