import { useQuery } from "@tanstack/react-query";
import { getCapacity } from "../services/api";
import type { CapacityResponse } from "../types/gym";

export function useCapacity(gymId: string) {
  const { data, isLoading, refetch } = useQuery<CapacityResponse>({
    queryKey: ["capacity", gymId],
    queryFn: () => getCapacity(gymId),
  });

  return {
    data: data ?? null,
    loading: isLoading,
    refetch,
  };
}
