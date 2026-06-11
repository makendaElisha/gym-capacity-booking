"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapacityService = void 0;
class CapacityService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getCapacity(id) {
        const gym = await this.repository.getGym(id);
        if (!gym) {
            throw new Error("Gym not found");
        }
        return {
            gymId: gym.id,
            percentage: Math.round((gym.currentUsersCount / gym.maxCapacity) * 100),
            currentUsersCount: gym.currentUsersCount,
            maxCapacity: gym.maxCapacity,
        };
    }
}
exports.CapacityService = CapacityService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwYWNpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcGFjaXR5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVUEsTUFBYSxlQUFlO0lBQ047SUFBcEIsWUFBb0IsVUFBMEI7UUFBMUIsZUFBVSxHQUFWLFVBQVUsQ0FBZ0I7SUFBRyxDQUFDO0lBRWxELEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBVTtRQUMxQixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELE9BQU87WUFDTCxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDYixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3ZFLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxpQkFBaUI7WUFDeEMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1NBQzdCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFqQkQsMENBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUd5bVJlcG9zaXRvcnkgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9neW0ucmVwb3NpdG9yeS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgR3ltIH0gZnJvbSBcIi4uL21vZGVscy9neW1cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR3ltQ2FwYWNpdHlSZXNwb25zZSB7XHJcbiAgZ3ltSWQ6IHN0cmluZztcclxuICBwZXJjZW50YWdlOiBudW1iZXI7XHJcbiAgY3VycmVudFVzZXJzQ291bnQ6IG51bWJlcjtcclxuICBtYXhDYXBhY2l0eTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FwYWNpdHlTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlcG9zaXRvcnk6IElHeW1SZXBvc2l0b3J5KSB7fVxyXG5cclxuICBhc3luYyBnZXRDYXBhY2l0eShpZDogc3RyaW5nKTogUHJvbWlzZTxHeW1DYXBhY2l0eVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBneW0gPSBhd2FpdCB0aGlzLnJlcG9zaXRvcnkuZ2V0R3ltKGlkKTtcclxuXHJcbiAgICBpZiAoIWd5bSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHeW0gbm90IGZvdW5kXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGd5bUlkOiBneW0uaWQsXHJcbiAgICAgIHBlcmNlbnRhZ2U6IE1hdGgucm91bmQoKGd5bS5jdXJyZW50VXNlcnNDb3VudCAvIGd5bS5tYXhDYXBhY2l0eSkgKiAxMDApLFxyXG4gICAgICBjdXJyZW50VXNlcnNDb3VudDogZ3ltLmN1cnJlbnRVc2Vyc0NvdW50LFxyXG4gICAgICBtYXhDYXBhY2l0eTogZ3ltLm1heENhcGFjaXR5LFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19