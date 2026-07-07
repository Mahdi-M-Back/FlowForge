import { Router } from "express";
import * as controller from "./controller.js";

const router = Router();

router.post("/signup", controller.signup);

export default router;
