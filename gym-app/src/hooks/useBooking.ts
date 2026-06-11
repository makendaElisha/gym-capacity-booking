import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookSlot } from "../services/api";

export type BookingState = {
  loading: boolean;
  success: boolean;
  error: string;
  book: (gymId: string, userId: string, slot: string) => Promise<void>;
};

export function useBooking(id: string): BookingState {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    { success: boolean },
    Error,
    { gymId: string; userId: string; slot: string }
  >({
    mutationFn: ({ gymId, userId, slot }) => bookSlot(gymId, userId, slot),
    onSuccess: () => {
      // Invalidate the capacity query so it refetches after a successful booking
      void queryClient.invalidateQueries({ queryKey: ["capacity", id] });
    },
  });

  async function book(gymId: string, userId: string, slot: string) {
    await mutation.mutateAsync({ gymId, userId, slot });
  }

  return {
    loading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error ? ((mutation.error as Error).message ?? "") : "",
    book,
  };
}
