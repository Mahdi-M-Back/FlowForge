import { Router } from "express";
import authRouter from "@/modules/auth/routes.js";
import workspaceRouter from "@/modules/workspace/routes.js";

const router = Router();

router.get("/health", (_, res) => {
  res.json({
    status: "ok",
  });
});

router.use("/auth", authRouter);
router.use("/workspace", workspaceRouter);

export default router;
