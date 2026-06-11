import { FastifyInstance } from "fastify";
import { MockRepository } from "../repositories/mock.repository";
import { CapacityService } from "../services/capacity.service";
import { BookingService } from "../services/booking.service";
import { GymController } from "../controllers/gym.controller";

export async function gymRoutes(fastify: FastifyInstance) {
  const repository = new MockRepository();

  const controller = new GymController(
    new CapacityService(repository),
    new BookingService(repository),
  );

  fastify.get(
    "/gyms/:id/capacity",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
      },
    },
    controller.getCapacity,
  );

  fastify.post(
    "/gyms/:id/book",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            userId: { type: "string" },
            slot: { type: "string" },
          },
          required: ["userId", "slot"],
          additionalProperties: false,
        },
      },
    },
    controller.book,
  );
}
