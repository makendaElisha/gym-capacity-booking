import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  message?: string | null;
  type?: "success" | "error";
  duration?: number;
  onDismiss?: () => void;
};

export function StatusMessage({
  message,
  type = "success",
  duration = 2500,
  onDismiss,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timeout);
  }, [message, duration, onDismiss]);

  if (!message || !visible) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        type === "success" ? styles.success : styles.error,
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  success: {
    backgroundColor: "#cbf4d5",
    borderColor: "#34eb68",
    borderWidth: 1,
  },
  error: {
    backgroundColor: "#FFEBEE",
    borderColor: "#E57373",
    borderWidth: 1,
  },
  text: {
    color: "#212121",
    fontWeight: "600",
    textAlign: "center",
  },
});
