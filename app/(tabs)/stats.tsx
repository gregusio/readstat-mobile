import { Colors } from "@/constants/Colors";
import { Text, useColorScheme, View } from "react-native";

export default function Stats() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.text }}>Edit app/(tabs)/stats.tsx to edit this screen.</Text>
    </View>
  );
}
