import { BookingService } from "./booking.service";
import { MockRepository } from "../repositories/mock.repository";
import { describe, expect, it, beforeEach } from "@jest/globals";

describe("BookingService", () => {
  let repository: MockRepository;
  let service: BookingService;

  beforeEach(() => {
    repository = new MockRepository();
    service = new BookingService(repository);
  });

  it("books a slot successfully when capacity is available", async () => {
    const result = await service.book("1", "user123", "18:00");
    expect(result).toEqual({ success: true });
  });

  it("prevents the same user from booking the same slot twice", async () => {
    await service.book("1", "user123", "18:00");

    await expect(service.book("1", "user123", "18:00")).rejects.toThrow(
      "You've already booked the slot",
    );
  });

  it("prevents booking when the slot is at full capacity", async () => {
    // Reserve the same slot until its maxCapacity is reached for the mock gym.
    for (let i = 0; i < 10; i += 1) {
      await service.book("1", `user-${i}` , "18:00");
    }

    await expect(service.book("1", "new-user", "18:00")).rejects.toThrow(
      "Slots full",
    );
  });

  it("throws when the gym does not exist", async () => {
    await expect(service.book("unknown", "user123", "18:00")).rejects.toThrow(
      "Gym not found",
    );
  });
});
