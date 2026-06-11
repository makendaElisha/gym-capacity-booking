import { IGymRepository } from "../interfaces/gym.repository.interface";
import { Gym } from "../models/gym";

export interface GymCapacityResponse {
  gymId: string;
  percentage: number;
  currentUsersCount: number;
  maxCapacity: number;
}

export class CapacityService {
  constructor(private repository: IGymRepository) {}

  async getCapacity(id: string): Promise<GymCapacityResponse> {
    const gym = await this.repository.getGym(id);

    if (!gym) {
      throw new Error("Gym not found");
    }

    return {
      gymId: gym.id,
      percentage: Math.round((gym.currentUsersCount / gym.maxCapacity) * 100),
      currentUsersCount: gym.currentUsersCount,
      maxCapacity: gym.maxCapacity,
    };
  }
}
