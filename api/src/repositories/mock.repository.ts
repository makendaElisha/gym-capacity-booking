import { Booking } from "../models/booking";
import { Gym } from "../models/gym";
import { IGymRepository } from "../interfaces/gym.repository.interface";
import { gym as initialGym, bookings as initialBookings } from "../data/gyms";
import * as fs from "fs";
import * as path from "path";

export class MockRepository implements IGymRepository {
  private gyms: Record<string, Gym>;
  private bookings: Booking[];
  private dataFilePath: string;

  constructor() {
    this.dataFilePath = path.join(__dirname, "../data/gyms.ts");
    this.gyms = {
      [initialGym.id]: { ...initialGym },
    };

    this.bookings = [...initialBookings];
  }

  async getGym(id: string): Promise<Gym | undefined> {
    return this.gyms[id];
  }

  async getBookings(gymId: string, slot: string): Promise<Booking[]> {
    return this.bookings.filter(
      (booking) => booking.gymId === gymId && booking.slot === slot,
    );
  }

  async getUserBooking(
    gymId: string,
    slot: string,
    userId: string,
  ): Promise<Booking | undefined> {
    return this.bookings.find(
      (booking) =>
        booking.gymId === gymId &&
        booking.slot === slot &&
        booking.userId === userId,
    );
  }

  async saveBooking(booking: Booking): Promise<void> {
    this.bookings.push(booking);
  }

  async incrementUsers(gymId: string): Promise<void> {
    const gym = this.gyms[gymId];
    if (gym) {
      gym.currentUsersCount += 1;
    }
  }

  async reserveBooking(booking: Booking): Promise<void> {
    const gym = this.gyms[booking.gymId];

    if (!gym) {
      throw new Error("Gym not found");
    }

    if (gym.currentUsersCount >= gym.maxCapacity) {
      throw new Error("Gym full");
    }

    const existingBookingForSlot = this.bookings.find(
      (item) =>
        item.gymId === booking.gymId &&
        item.slot === booking.slot &&
        item.userId === booking.userId,
    );

    if (existingBookingForSlot) {
      throw new Error("You've already booked the slot");
    }

    const slotBookings = this.bookings.filter(
      (item) => item.gymId === booking.gymId && item.slot === booking.slot
    );

    if (slotBookings.length >= gym.maxCapacity) {
      throw new Error("Slots full");
    }

    this.bookings.push(booking);
  }
}
