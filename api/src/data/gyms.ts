import { Gym } from "../models/gym";
import { Booking } from "../models/booking";

export const gym: Gym = {
  id: "1",
  name: "Downtown Gym",
  maxCapacity: 10,
  currentUsersCount: 5,
};

export const bookings: Booking[] = [
  {
    gymId: "1",
    userId: "user1",
    slot: "10:00",
    createdAt: new Date("2024-06-01T00:00:00.000Z"),
  },
  {
    gymId: "1",
    userId: "user2",
    slot: "10:00",
    createdAt: new Date("2024-06-01T00:00:00.000Z"),
  },
  {
    gymId: "1",
    userId: "user3",
    slot: "11:00",
    createdAt: new Date("2024-06-02T00:00:00.000Z"),
  },
  {
    gymId: "1",
    userId: "user4",
    slot: "11:00",
    createdAt: new Date("2024-06-02T00:00:00.000Z"),
  },
  {
    gymId: "1",
    userId: "user5",
    slot: "12:00",
    createdAt: new Date("2024-06-03T00:00:00.000Z"),
  },
//   {
//     gymId: "1",
//     userId: "user6",
//     slot: "12:00",
//     createdAt: new Date("2024-06-03T00:00:00.000Z"),
//   },
//   {
//     gymId: "1",
//     userId: "user7",
//     slot: "14:00",
//     createdAt: new Date("2024-06-04T00:00:00.000Z"),
//   },
//   {
//     gymId: "1",
//     userId: "user8",
//     slot: "14:00",
//     createdAt: new Date("2024-06-04T00:00:00.000Z"),
//   },
//   {
//     gymId: "1",
//     userId: "user9",
//     slot: "15:00",
//     createdAt: new Date("2024-06-05T00:00:00.000Z"),
//   },
//   {
//     gymId: "1",
//     userId: "user10",
//     slot: "15:00",
//     createdAt: new Date("2024-06-05T00:00:00.000Z"),
//   },
//   {
//     gymId: "1",
//     userId: "user11",
//     slot: "16:00",
//     createdAt: new Date("2024-06-06T00:00:00.000Z"),
//   },
//   {
//     gymId: "1",
//     userId: "user12",
//     slot: "16:00",
//     createdAt: new Date("2024-06-06T00:00:00.000Z"),
//   },
//   {
//     gymId: "1",
//     userId: "user13",
//     slot: "17:00",
//     createdAt: new Date("2024-06-07T00:00:00.000Z"),
//   },
//   {
//     gymId: "1",
//     userId: "user14",
//     slot: "17:00",
//     createdAt: new Date("2024-06-07T00:00:00.000Z"),
//   },
//   {
//     gymId: "1",
//     userId: "user15",
//     slot: "18:00",
//     createdAt: new Date("2024-06-08T00:00:00.000Z"),
//   },
//   {
//     gymId: "1",
//     userId: "user123",
//     slot: "18:00",
//     createdAt: new Date("2026-06-10T11:51:57.536Z"),
//   }
];
