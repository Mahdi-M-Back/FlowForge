import { Router } from "express";
import jwt from "@/config/jwt.js";
import * as controller from "./controller.js";
import membershipRouter from "@/modules/membership/routes.js"
import projectRouter from "@/modules/project/routes.js";

const router = Router();
router.use('/:id/memberships',membershipRouter)
router.use('/:wid/projects',projectRouter)
router.use(jwt.protect);
router
  .route("/")
  .post(controller.createWorkspace)
  .get(controller.getAllWorkspaces);

router
  .route("/:id")
  .get(controller.getOne)
  .patch(controller.updateWorkspace)
  .delete(controller.deleteWorkspace);

export default router;
