import { Booking } from "../models/booking";
import { Gym } from "../models/gym";

export interface IGymRepository {
  getGym(id: string): Promise<Gym | undefined>;

  getBookings(gymId: string, slot: string): Promise<Booking[]>;

  getUserBooking(
    gymId: string,
    slot: string,
    userId: string,
  ): Promise<Booking | undefined>;

  saveBooking(booking: Booking): Promise<void>;

  incrementUsers(gymId: string): Promise<void>;

  reserveBooking(booking: Booking): Promise<void>;
}