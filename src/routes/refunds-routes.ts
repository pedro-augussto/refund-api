import { Router } from "express";
import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const refundRoutes = Router();
const refundsController = new RefundsController();

refundRoutes.post(
  "/",
  verifyUserAuthorization(["employe"]),
  refundsController.create
);

refundRoutes.get(
  "/",
  verifyUserAuthorization(["manager"]),
  refundsController.index
);

refundRoutes.get(
  "/:id",
  verifyUserAuthorization(["employe", "manager"]),
  refundsController.show
);

export { refundRoutes };
