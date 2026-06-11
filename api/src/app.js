"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const gym_routes_1 = require("./routes/gym.routes");
const app = (0, fastify_1.default)();
app.register(gym_routes_1.gymRoutes);
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLG9EQUFnRDtBQUVoRCxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsUUFBUSxDQUFDLHNCQUFTLENBQUMsQ0FBQztBQUV4QixrQkFBZSxHQUFHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmFzdGlmeSBmcm9tIFwiZmFzdGlmeVwiO1xyXG5pbXBvcnQgeyBneW1Sb3V0ZXMgfSBmcm9tIFwiLi9yb3V0ZXMvZ3ltLnJvdXRlc1wiO1xyXG5cclxuY29uc3QgYXBwID0gRmFzdGlmeSgpO1xyXG5cclxuYXBwLnJlZ2lzdGVyKGd5bVJvdXRlcyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcHA7Il19