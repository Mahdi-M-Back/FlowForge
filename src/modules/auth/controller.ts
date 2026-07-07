import type { Request, Response } from "express";

import service from "./service.js";

export async function signup(req: Request, res: Response) {
  const user = await service.create(req.body);

  res.status(201).json({
    status: "success",
    data: user.rows[0],
  });
}
