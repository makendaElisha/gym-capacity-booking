"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gymRoutes = gymRoutes;
const mock_repository_1 = require("../repositories/mock.repository");
const capacity_service_1 = require("../services/capacity.service");
const booking_service_1 = require("../services/booking.service");
const gym_controller_1 = require("../controllers/gym.controller");
async function gymRoutes(fastify) {
    const repository = new mock_repository_1.MockRepository();
    const controller = new gym_controller_1.GymController(new capacity_service_1.CapacityService(repository), new booking_service_1.BookingService(repository));
    fastify.get("/gyms/:id/capacity", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            },
        },
    }, controller.getCapacity);
    fastify.post("/gyms/:id/book", {
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
    }, controller.book);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3ltLnJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImd5bS5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSw4QkFnREM7QUFyREQscUVBQWlFO0FBQ2pFLG1FQUErRDtBQUMvRCxpRUFBNkQ7QUFDN0Qsa0VBQThEO0FBRXZELEtBQUssVUFBVSxTQUFTLENBQUMsT0FBd0I7SUFDdEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxnQ0FBYyxFQUFFLENBQUM7SUFFeEMsTUFBTSxVQUFVLEdBQUcsSUFBSSw4QkFBYSxDQUNsQyxJQUFJLGtDQUFlLENBQUMsVUFBVSxDQUFDLEVBQy9CLElBQUksZ0NBQWMsQ0FBQyxVQUFVLENBQUMsQ0FDL0IsQ0FBQztJQUVGLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsb0JBQW9CLEVBQ3BCO1FBQ0UsTUFBTSxFQUFFO1lBQ04sTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRTtvQkFDVixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2lCQUN2QjtnQkFDRCxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7YUFDakI7U0FDRjtLQUNGLEVBQ0QsVUFBVSxDQUFDLFdBQVcsQ0FDdkIsQ0FBQztJQUVGLE9BQU8sQ0FBQyxJQUFJLENBQ1YsZ0JBQWdCLEVBQ2hCO1FBQ0UsTUFBTSxFQUFFO1lBQ04sTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRTtvQkFDVixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2lCQUN2QjtnQkFDRCxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsVUFBVSxFQUFFO29CQUNWLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7b0JBQzFCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7aUJBQ3pCO2dCQUNELFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQzVCLG9CQUFvQixFQUFFLEtBQUs7YUFDNUI7U0FDRjtLQUNGLEVBQ0QsVUFBVSxDQUFDLElBQUksQ0FDaEIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGYXN0aWZ5SW5zdGFuY2UgfSBmcm9tIFwiZmFzdGlmeVwiO1xyXG5pbXBvcnQgeyBNb2NrUmVwb3NpdG9yeSB9IGZyb20gXCIuLi9yZXBvc2l0b3JpZXMvbW9jay5yZXBvc2l0b3J5XCI7XHJcbmltcG9ydCB7IENhcGFjaXR5U2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jYXBhY2l0eS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEJvb2tpbmdTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2Jvb2tpbmcuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHeW1Db250cm9sbGVyIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2d5bS5jb250cm9sbGVyXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ3ltUm91dGVzKGZhc3RpZnk6IEZhc3RpZnlJbnN0YW5jZSkge1xyXG4gIGNvbnN0IHJlcG9zaXRvcnkgPSBuZXcgTW9ja1JlcG9zaXRvcnkoKTtcclxuXHJcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBHeW1Db250cm9sbGVyKFxyXG4gICAgbmV3IENhcGFjaXR5U2VydmljZShyZXBvc2l0b3J5KSxcclxuICAgIG5ldyBCb29raW5nU2VydmljZShyZXBvc2l0b3J5KSxcclxuICApO1xyXG5cclxuICBmYXN0aWZ5LmdldChcclxuICAgIFwiL2d5bXMvOmlkL2NhcGFjaXR5XCIsXHJcbiAgICB7XHJcbiAgICAgIHNjaGVtYToge1xyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcclxuICAgICAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAgICAgaWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlcXVpcmVkOiBbXCJpZFwiXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNvbnRyb2xsZXIuZ2V0Q2FwYWNpdHksXHJcbiAgKTtcclxuXHJcbiAgZmFzdGlmeS5wb3N0KFxyXG4gICAgXCIvZ3ltcy86aWQvYm9va1wiLFxyXG4gICAge1xyXG4gICAgICBzY2hlbWE6IHtcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICAgIGlkOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZXF1aXJlZDogW1wiaWRcIl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiB7XHJcbiAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxyXG4gICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICB1c2VySWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxyXG4gICAgICAgICAgICBzbG90OiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZXF1aXJlZDogW1widXNlcklkXCIsIFwic2xvdFwiXSxcclxuICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNvbnRyb2xsZXIuYm9vayxcclxuICApO1xyXG59XHJcbiJdfQ==