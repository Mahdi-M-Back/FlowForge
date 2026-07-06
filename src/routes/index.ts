import { Router } from "express";

export function createRouter() {
  const router = Router();

  router.get("/health", (_, res) => {
    res.json({
      status: "ok",
    });
  });

  return router;
}