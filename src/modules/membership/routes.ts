import { Router } from "express";
import * as controller from "./controller.js";

const router = Router();

router
  .route("/")
  .post(controller.createMembership)
  .get(controller.getAllMembership);

router
  .route("/:id")
  .get(controller.getMembership)
  .patch(controller.updateMembership)
  .delete(controller.deleteMembership);
