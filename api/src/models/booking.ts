export interface Booking {
    gymId: string;
    userId: string;
    slot: string; // e.g., "09:00, 11:00, 14:00"
    createdAt?: Date;
}