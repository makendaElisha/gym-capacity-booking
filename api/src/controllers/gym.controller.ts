import { FastifyReply, FastifyRequest } from "fastify";
import { CapacityService } from "../services/capacity.service";
import { BookingService } from "../services/booking.service";

export class GymController {
  constructor(
    private capacityService: CapacityService,
    private bookingService: BookingService,
  ) {}

  getCapacity = async (
    request: FastifyRequest<{
      Params: { id: string };
    }>,

    reply: FastifyReply,
  ) => {
    const result = await this.capacityService.getCapacity(request.params.id);

    return reply.send(result);
  };

  book = async (
    request: FastifyRequest<{
      Params: { id: string };

      Body: {
        userId: string;
        slot: string;
      };
    }>,

    reply: FastifyReply,
  ) => {
    try {
      const result = await this.bookingService.book(
        request.params.id,
        request.body.userId,
        request.body.slot,
      );

      return reply.send(result);
    } catch (error: any) {
      return reply
        .status(409)
        .send({
          message: error.message,
        });
    }
  };
}
