import React from "react";
import { View, Text, StyleSheet, useColorScheme, Pressable } from "react-native";
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
        <>
          <Text style={[styles.title, { color: colors.text }]}>{book.title}</Text>
          {book.authors?.length ? (
            <Text style={[styles.author, { color: colors.textSecondary }]}>
              {book.authors.join(", ")}
            </Text>
          ) : null}
          {book.description ? (
            <Text style={[styles.description, { color: colors.text }]}>
              {book.description}
            </Text>
          ) : (
            <Text style={[styles.placeholder, { color: colors.textSecondary }]}>
              No description available.
            </Text>
          )}
        </>
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
  backLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  placeholder: {
    fontSize: 16,
  },
});
