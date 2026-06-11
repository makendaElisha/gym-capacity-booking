import { Booking } from "../models/booking";
import { IGymRepository } from "../interfaces/gym.repository.interface";

export class BookingService {
  constructor(private repository: IGymRepository) {}

  async book(gymId: string, userId: string, slot: string) {
    const gym = await this.repository.getGym(gymId);

    if (!gym) {
      throw new Error("Gym not found");
    }

    const booking: Booking = {
      gymId,
      userId,
      slot,
      createdAt: new Date(),
    };

    await this.repository.reserveBooking(booking);

    return {
      success: true,
    };
  }
}
