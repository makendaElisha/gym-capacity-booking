import { IGymRepository } from "../interfaces/gym.repository.interface";
export interface GymCapacityResponse {
    gymId: string;
    percentage: number;
    currentUsersCount: number;
    maxCapacity: number;
}
export declare class CapacityService {
    private repository;
    constructor(repository: IGymRepository);
    getCapacity(id: string): Promise<GymCapacityResponse>;
}
