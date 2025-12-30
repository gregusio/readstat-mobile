import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FloatingActionButtonProps {
  onPress: () => void;
  backgroundColor: string;
}

export function FloatingActionButton({ onPress, backgroundColor }: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});
