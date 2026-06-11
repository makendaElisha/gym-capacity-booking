import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  loading: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export function BookButton({ loading, disabled = false, onPress }: Props) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={[styles.text, isDisabled && styles.textDisabled]}>
        {loading ? "Booking..." : "Book Slot"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#D0D0D0",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  textDisabled: {
    color: "#999",
  },
});
