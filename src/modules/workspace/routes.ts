import { Router } from "express";
import jwt from "@/config/jwt.js";
import * as controller from "./controller.js";

const router = Router();
router.use(jwt.protect)
router
  .route("/")
  .post(controller.createWorkspace).get(controller.getAllWorkspaces);

router.route('/:id').get(controller.getOne).patch(controller.updateWorkspace).delete(controller.deleteWorkspace)




export default router;