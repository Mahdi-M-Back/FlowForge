import { Router } from "express";
import authRouter from "@/modules/auth/routes.js";
import workspaceRouter from "@/modules/workspace/routes.js";
import membershipRouter from "@/modules/membership/routes.js"
import projectRouter from "@/modules/project/routes.js";

const router = Router();

router.get("/health", (_, res) => {
  res.json({
    status: "ok",
  });
});

router.use("/auth", authRouter);
router.use("/workspaces", workspaceRouter);
router.use("/memberships", membershipRouter);
router.use("/projects", projectRouter);

export default router;
