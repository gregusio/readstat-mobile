import { Colors } from "@/src/constants/Colors";
import { Text, useColorScheme, View } from "react-native";

export default function Settings() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.background,
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.text }}>Edit app/(tabs)/settings.tsx to edit this screen.</Text>
    </View>
  );
}
