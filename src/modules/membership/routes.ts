import { Router } from "express";
import * as controller from "./controller.js";
import jwt from "@/config/jwt.js";

const router = Router({ mergeParams: true });
router.use(jwt.protect);

router
  .route("/")
  .post(controller.createMembership)
  .get(controller.getAllMembership);

router
  .route("/:userId")
  .get(controller.getMembership)
  .patch(controller.updateMembership)
  .delete(controller.deleteMembership);

export default router;
