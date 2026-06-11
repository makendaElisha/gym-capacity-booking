"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
class BookingService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async book(gymId, userId, slot) {
        const gym = await this.repository.getGym(gymId);
        if (!gym) {
            throw new Error("Gym not found");
        }
        const booking = {
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
exports.BookingService = BookingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9va2luZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQWEsY0FBYztJQUNMO0lBQXBCLFlBQW9CLFVBQTBCO1FBQTFCLGVBQVUsR0FBVixVQUFVLENBQWdCO0lBQUcsQ0FBQztJQUVsRCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQUUsSUFBWTtRQUNwRCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELE1BQU0sT0FBTyxHQUFZO1lBQ3ZCLEtBQUs7WUFDTCxNQUFNO1lBQ04sSUFBSTtZQUNKLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtTQUN0QixDQUFDO1FBRUYsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QyxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBdkJELHdDQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2tpbmcgfSBmcm9tIFwiLi4vbW9kZWxzL2Jvb2tpbmdcIjtcclxuaW1wb3J0IHsgSUd5bVJlcG9zaXRvcnkgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9neW0ucmVwb3NpdG9yeS5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb29raW5nU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXBvc2l0b3J5OiBJR3ltUmVwb3NpdG9yeSkge31cclxuXHJcbiAgYXN5bmMgYm9vayhneW1JZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgc2xvdDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBneW0gPSBhd2FpdCB0aGlzLnJlcG9zaXRvcnkuZ2V0R3ltKGd5bUlkKTtcclxuXHJcbiAgICBpZiAoIWd5bSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHeW0gbm90IGZvdW5kXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJvb2tpbmc6IEJvb2tpbmcgPSB7XHJcbiAgICAgIGd5bUlkLFxyXG4gICAgICB1c2VySWQsXHJcbiAgICAgIHNsb3QsXHJcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcclxuICAgIH07XHJcblxyXG4gICAgYXdhaXQgdGhpcy5yZXBvc2l0b3J5LnJlc2VydmVCb29raW5nKGJvb2tpbmcpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=