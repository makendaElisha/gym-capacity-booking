import { StyleSheet, Text, View } from "react-native";

type Props = {
  percentage: number;
  currentUsersCount: number;
  maxCapacity: number;
};

export function CapacityCard({
  percentage,
  currentUsersCount,
  maxCapacity,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Live Capacity</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.percentage}>{percentage}% full</Text>
      <Text style={styles.details}>
        {currentUsersCount} / {maxCapacity} users
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  barBackground: {
    width: "100%",
    height: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  barFill: {
    height: 16,
    backgroundColor: "#4caf50",
  },
  percentage: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  details: {
    color: "#666",
    marginTop: 2,
  },
});
