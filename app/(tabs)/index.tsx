import { Colors } from "@/constants/Colors";
import { Text, useColorScheme, View } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.text }}>Edit app/(tabs)/index.tsx to edit this screen.</Text>
    </View>
  );
}
