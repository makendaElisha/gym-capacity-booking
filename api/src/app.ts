import Fastify from "fastify";
import { gymRoutes } from "./routes/gym.routes";

const app = Fastify();

app.register(gymRoutes);

export default app;