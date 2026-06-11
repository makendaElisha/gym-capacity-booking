import { IGymRepository } from "../interfaces/gym.repository.interface";
export declare class BookingService {
    private repository;
    constructor(repository: IGymRepository);
    book(gymId: string, userId: string, slot: string): Promise<{
        success: boolean;
    }>;
}
