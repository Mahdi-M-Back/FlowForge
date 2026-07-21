import { Router } from "express";
import * as controller from "./controller.js";
import jwt from "@/config/jwt.js";

const router = Router({ mergeParams: true });

router.use(jwt.protect);

router.route("/").post(controller.createProject).get(controller.getAllProject);

export default router;
