import { Router } from "express";
import authRouter from "@/modules/auth/routes.js";
const router = Router();

router.get("/health", (_, res) => {
  res.json({
    status: "ok",
  });
});

router.use("/auth", authRouter);

export default router;
