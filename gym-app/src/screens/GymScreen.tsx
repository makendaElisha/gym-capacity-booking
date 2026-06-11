import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { BookButton } from "../components/BookButton";
import { CapacityCard } from "../components/CapacityCard";
import { StatusMessage } from "../components/StatusMessage";
import { useBooking } from "../hooks/useBooking";
import { useCapacity } from "../hooks/useCapacity";

const TIME_SLOTS = ["09:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

type StatusState = {
  id: number;
  message: string;
  type: "success" | "error";
} | null;

export default function GymScreen() {
  const gymId = "1"; // In a real app, this would come from props or navigation params based on the selected gym

  const { data, loading, refetch } = useCapacity(gymId);
  const booking = useBooking(gymId);
  const [status, setStatus] = useState<StatusState>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    if (booking.success) {
      void refetch?.();
      setStatus({
        id: Date.now(),
        message: "Booking successful",
        type: "success",
      });
    }
  }, [booking.success, refetch]);

  useEffect(() => {
    if (booking.error) {
      setStatus({
        id: Date.now(),
        message: booking.error,
        type: "error",
      });
    }
  }, [booking.error]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.statusText}>Loading capacity…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data ? (
        <CapacityCard
          percentage={data.percentage}
          currentUsersCount={data.currentUsersCount}
          maxCapacity={data.maxCapacity}
        />
      ) : (
        <Text style={styles.error}>Unable to load capacity data.</Text>
      )}

      <Text style={styles.slotsTitle}>Select a Time Slot</Text>
      <View style={styles.slotsGrid}>
        {TIME_SLOTS.map((slot) => (
          <View
            key={slot}
            style={[
              styles.slotButton,
              selectedSlot === slot && styles.slotButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.slotText,
                selectedSlot === slot && styles.slotTextSelected,
              ]}
              onPress={() => setSelectedSlot(slot)}
            >
              {slot}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.action}>
        <BookButton
          loading={booking.loading}
          disabled={!selectedSlot}
          onPress={() => booking.book(gymId, "userTestId", selectedSlot!)}
        />
      </View>

      <StatusMessage
        key={status?.id ?? undefined}
        message={status?.message ?? null}
        type={status?.type ?? "success"}
        onDismiss={() => setStatus(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slotsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: "#333",
  },
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  slotButton: {
    width: "31%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  slotButtonSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FD",
  },
  slotText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  slotTextSelected: {
    color: "#007AFF",
    fontWeight: "600",
  },
  action: {
    marginTop: 20,
  },
  success: {
    color: "#2e7d32",
    marginTop: 12,
    fontWeight: "600",
  },
  error: {
    color: "#c62828",
    marginTop: 12,
    fontWeight: "600",
  },
  statusText: {
    marginTop: 8,
    color: "#666",
  },
});
