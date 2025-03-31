import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { refundRoutes } from "./refunds-routes";
import { uploadsRoutes } from "./uploads-routes";
import { sessionsRoutes } from "./sessions-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router();

//Rotas Publicas
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

//Rotas Privadas
routes.use(ensureAuthenticated);
routes.use("/refunds", refundRoutes);
routes.use("/uploads", uploadsRoutes);

export { routes };
