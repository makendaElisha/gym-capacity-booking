"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRepository = void 0;
const gyms_1 = require("../data/gyms");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class MockRepository {
    gyms;
    bookings;
    dataFilePath;
    constructor() {
        this.dataFilePath = path.join(__dirname, "../data/gyms.ts");
        this.gyms = {
            [gyms_1.gym.id]: { ...gyms_1.gym },
        };
        this.bookings = [...gyms_1.bookings];
    }
    async getGym(id) {
        return this.gyms[id];
    }
    async getBookings(gymId, slot) {
        return this.bookings.filter((booking) => booking.gymId === gymId && booking.slot === slot);
    }
    async getUserBooking(gymId, slot, userId) {
        return this.bookings.find((booking) => booking.gymId === gymId &&
            booking.slot === slot &&
            booking.userId === userId);
    }
    async saveBooking(booking) {
        this.bookings.push(booking);
    }
    async incrementUsers(gymId) {
        const gym = this.gyms[gymId];
        if (gym) {
            gym.currentUsersCount += 1;
        }
    }
    async reserveBooking(booking) {
        const gym = this.gyms[booking.gymId];
        if (!gym) {
            throw new Error("Gym not found");
        }
        const existingBooking = this.bookings.find((item) => item.gymId === booking.gymId &&
            item.slot === booking.slot &&
            item.userId === booking.userId);
        if (existingBooking) {
            throw new Error("Already booked");
        }
        const slotBookings = this.bookings.filter((item) => item.gymId === booking.gymId && item.slot === booking.slot);
        if (slotBookings.length >= gym.maxCapacity) {
            throw new Error("Slot full");
        }
        // Simulate atomic reservation within the mock repository.
        this.bookings.push(booking);
        gym.currentUsersCount += 1;
        console.log("********** ", gym.currentUsersCount, " / ", this.bookings.length);
        // Persist changes back to the gyms.ts file
        // this.persistGymData(gym);
    }
    persistGymData(gym) {
        const bookingsCode = this.generateBookingsCode();
        const gymCode = `export const gym: Gym = {
  id: "${gym.id}",
  name: "${gym.name}",
  maxCapacity: ${gym.maxCapacity},
  currentUsersCount: ${gym.currentUsersCount},
};`;
        const fileContent = `import { Gym } from "../models/gym";
import { Booking } from "../models/booking";

${gymCode}

export const bookings: Booking[] = [
${bookingsCode}
];
`;
        fs.writeFileSync(this.dataFilePath, fileContent, "utf-8");
    }
    generateBookingsCode() {
        return this.bookings
            .map((booking) => `  {
    gymId: "${booking.gymId}",
    userId: "${booking.userId}",
    slot: "${booking.slot}",
    createdAt: new Date("${booking.createdAt.toISOString()}"),
  }`)
            .join(",\n");
    }
}
exports.MockRepository = MockRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9jay5yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHVDQUE4RTtBQUM5RSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBRTdCLE1BQWEsY0FBYztJQUNqQixJQUFJLENBQXNCO0lBQzFCLFFBQVEsQ0FBWTtJQUNwQixZQUFZLENBQVM7SUFFN0I7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksR0FBRztZQUNWLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUU7U0FDbkMsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVU7UUFDckIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWEsRUFBRSxJQUFZO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ3pCLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksQ0FDOUQsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUNsQixLQUFhLEVBQ2IsSUFBWSxFQUNaLE1BQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN2QixDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ1YsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLO1lBQ3ZC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V0FBVyxFQUFFO0lBQ3RELENBQ0c7YUFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBdEhELHdDQXNIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2tpbmcgfSBmcm9tIFwiLi4vbW9kZWxzL2Jvb2tpbmdcIjtcbmltcG9ydCB7IEd5bSB9IGZyb20gXCIuLi9tb2RlbHMvZ3ltXCI7XG5pbXBvcnQgeyBJR3ltUmVwb3NpdG9yeSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2d5bS5yZXBvc2l0b3J5LmludGVyZmFjZVwiO1xuaW1wb3J0IHsgZ3ltIGFzIGluaXRpYWxHeW0sIGJvb2tpbmdzIGFzIGluaXRpYWxCb29raW5ncyB9IGZyb20gXCIuLi9kYXRhL2d5bXNcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgY2xhc3MgTW9ja1JlcG9zaXRvcnkgaW1wbGVtZW50cyBJR3ltUmVwb3NpdG9yeSB7XG4gIHByaXZhdGUgZ3ltczogUmVjb3JkPHN0cmluZywgR3ltPjtcbiAgcHJpdmF0ZSBib29raW5nczogQm9va2luZ1tdO1xuICBwcml2YXRlIGRhdGFGaWxlUGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGF0YUZpbGVQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9kYXRhL2d5bXMudHNcIik7XG4gICAgdGhpcy5neW1zID0ge1xuICAgICAgW2luaXRpYWxHeW0uaWRdOiB7IC4uLmluaXRpYWxHeW0gfSxcbiAgICB9O1xuXG4gICAgdGhpcy5ib29raW5ncyA9IFsuLi5pbml0aWFsQm9va2luZ3NdO1xuICB9XG5cbiAgYXN5bmMgZ2V0R3ltKGlkOiBzdHJpbmcpOiBQcm9taXNlPEd5bSB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmd5bXNbaWRdO1xuICB9XG5cbiAgYXN5bmMgZ2V0Qm9va2luZ3MoZ3ltSWQ6IHN0cmluZywgc2xvdDogc3RyaW5nKTogUHJvbWlzZTxCb29raW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5ib29raW5ncy5maWx0ZXIoXG4gICAgICAoYm9va2luZykgPT4gYm9va2luZy5neW1JZCA9PT0gZ3ltSWQgJiYgYm9va2luZy5zbG90ID09PSBzbG90LFxuICAgICk7XG4gIH1cblxuICBhc3luYyBnZXRVc2VyQm9va2luZyhcbiAgICBneW1JZDogc3RyaW5nLFxuICAgIHNsb3Q6IHN0cmluZyxcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxCb29raW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuYm9va2luZ3MuZmluZChcbiAgICAgIChib29raW5nKSA9PlxuICAgICAgICBib29raW5nLmd5bUlkID09PSBneW1JZCAmJlxuICAgICAgICBib29raW5nLnNsb3QgPT09IHNsb3QgJiZcbiAgICAgICAgYm9va2luZy51c2VySWQgPT09IHVzZXJJZCxcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgc2F2ZUJvb2tpbmcoYm9va2luZzogQm9va2luZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuYm9va2luZ3MucHVzaChib29raW5nKTtcbiAgfVxuXG4gIGFzeW5jIGluY3JlbWVudFVzZXJzKGd5bUlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBneW0gPSB0aGlzLmd5bXNbZ3ltSWRdO1xuICAgIGlmIChneW0pIHtcbiAgICAgIGd5bS5jdXJyZW50VXNlcnNDb3VudCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlc2VydmVCb29raW5nKGJvb2tpbmc6IEJvb2tpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBneW0gPSB0aGlzLmd5bXNbYm9va2luZy5neW1JZF07XG5cbiAgICBpZiAoIWd5bSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR3ltIG5vdCBmb3VuZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBleGlzdGluZ0Jvb2tpbmcgPSB0aGlzLmJvb2tpbmdzLmZpbmQoXG4gICAgICAoaXRlbSkgPT5cbiAgICAgICAgaXRlbS5neW1JZCA9PT0gYm9va2luZy5neW1JZCAmJlxuICAgICAgICBpdGVtLnNsb3QgPT09IGJvb2tpbmcuc2xvdCAmJlxuICAgICAgICBpdGVtLnVzZXJJZCA9PT0gYm9va2luZy51c2VySWQsXG4gICAgKTtcblxuICAgIGlmIChleGlzdGluZ0Jvb2tpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFscmVhZHkgYm9va2VkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNsb3RCb29raW5ncyA9IHRoaXMuYm9va2luZ3MuZmlsdGVyKFxuICAgICAgKGl0ZW0pID0+IGl0ZW0uZ3ltSWQgPT09IGJvb2tpbmcuZ3ltSWQgJiYgaXRlbS5zbG90ID09PSBib29raW5nLnNsb3QsXG4gICAgKTtcblxuICAgIGlmIChzbG90Qm9va2luZ3MubGVuZ3RoID49IGd5bS5tYXhDYXBhY2l0eSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2xvdCBmdWxsXCIpO1xuICAgIH1cblxuICAgIC8vIFNpbXVsYXRlIGF0b21pYyByZXNlcnZhdGlvbiB3aXRoaW4gdGhlIG1vY2sgcmVwb3NpdG9yeS5cbiAgICB0aGlzLmJvb2tpbmdzLnB1c2goYm9va2luZyk7XG4gICAgZ3ltLmN1cnJlbnRVc2Vyc0NvdW50ICs9IDE7XG5cbiAgICBjb25zb2xlLmxvZyhcIioqKioqKioqKiogXCIsIGd5bS5jdXJyZW50VXNlcnNDb3VudCwgXCIgLyBcIiwgdGhpcy5ib29raW5ncy5sZW5ndGgpO1xuICAgIFxuICAgIC8vIFBlcnNpc3QgY2hhbmdlcyBiYWNrIHRvIHRoZSBneW1zLnRzIGZpbGVcbiAgICAvLyB0aGlzLnBlcnNpc3RHeW1EYXRhKGd5bSk7XG4gIH1cblxuICBwcml2YXRlIHBlcnNpc3RHeW1EYXRhKGd5bTogR3ltKTogdm9pZCB7XG4gICAgY29uc3QgYm9va2luZ3NDb2RlID0gdGhpcy5nZW5lcmF0ZUJvb2tpbmdzQ29kZSgpO1xuICAgIGNvbnN0IGd5bUNvZGUgPSBgZXhwb3J0IGNvbnN0IGd5bTogR3ltID0ge1xuICBpZDogXCIke2d5bS5pZH1cIixcbiAgbmFtZTogXCIke2d5bS5uYW1lfVwiLFxuICBtYXhDYXBhY2l0eTogJHtneW0ubWF4Q2FwYWNpdHl9LFxuICBjdXJyZW50VXNlcnNDb3VudDogJHtneW0uY3VycmVudFVzZXJzQ291bnR9LFxufTtgO1xuXG4gICAgY29uc3QgZmlsZUNvbnRlbnQgPSBgaW1wb3J0IHsgR3ltIH0gZnJvbSBcIi4uL21vZGVscy9neW1cIjtcbmltcG9ydCB7IEJvb2tpbmcgfSBmcm9tIFwiLi4vbW9kZWxzL2Jvb2tpbmdcIjtcblxuJHtneW1Db2RlfVxuXG5leHBvcnQgY29uc3QgYm9va2luZ3M6IEJvb2tpbmdbXSA9IFtcbiR7Ym9va2luZ3NDb2RlfVxuXTtcbmA7XG5cbiAgICBmcy53cml0ZUZpbGVTeW5jKHRoaXMuZGF0YUZpbGVQYXRoLCBmaWxlQ29udGVudCwgXCJ1dGYtOFwiKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVCb29raW5nc0NvZGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ib29raW5nc1xuICAgICAgLm1hcChcbiAgICAgICAgKGJvb2tpbmcpID0+IGAgIHtcbiAgICBneW1JZDogXCIke2Jvb2tpbmcuZ3ltSWR9XCIsXG4gICAgdXNlcklkOiBcIiR7Ym9va2luZy51c2VySWR9XCIsXG4gICAgc2xvdDogXCIke2Jvb2tpbmcuc2xvdH1cIixcbiAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKFwiJHtib29raW5nLmNyZWF0ZWRBdC50b0lTT1N0cmluZygpfVwiKSxcbiAgfWAsXG4gICAgICApXG4gICAgICAuam9pbihcIixcXG5cIik7XG4gIH1cbn1cbiJdfQ==