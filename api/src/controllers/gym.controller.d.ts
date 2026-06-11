import { FastifyReply, FastifyRequest } from "fastify";
import { CapacityService } from "../services/capacity.service";
import { BookingService } from "../services/booking.service";
export declare class GymController {
    private capacityService;
    private bookingService;
    constructor(capacityService: CapacityService, bookingService: BookingService);
    getCapacity: (request: FastifyRequest<{
        Params: {
            id: string;
        };
    }>, reply: FastifyReply) => Promise<never>;
    book: (request: FastifyRequest<{
        Params: {
            id: string;
        };
        Body: {
            userId: string;
            slot: string;
        };
    }>, reply: FastifyReply) => Promise<never>;
}
