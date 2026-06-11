import type { CapacityResponse } from "../types/gym";

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://38b0-197-185-206-231.ngrok-free.app";

export async function getCapacity(gymId: string): Promise<CapacityResponse> {
  const response = await fetch(`${BASE_URL}/gyms/${gymId}/capacity`);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message ?? "Unable to load capacity");
  }

  return payload;
}

export async function bookSlot(
  gymId: string,
  userId: string,
  slot: string,
): Promise<{ success: boolean }> {
  const response = await fetch(`${BASE_URL}/gyms/${gymId}/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      slot,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message ?? "Booking failed");
  }

  return payload;
}
