import { Router } from "express";
import jwt from "@/config/jwt.js";
import * as controller from "./controller.js";

const router = Router();
router.use(jwt.protect)
router
  .route("/")
  .post(controller.createWorkspace);





export default router;