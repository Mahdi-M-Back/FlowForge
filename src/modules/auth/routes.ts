import { Router } from "express";
import * as controller from "./controller.js";

const router = Router();

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.post("/refresh-token", controller.refreshToken);

export default router;
