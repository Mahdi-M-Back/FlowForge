import type { Request, Response } from "express";

import service from "./service.js";

export async function signup(req: Request, res: Response) {
  const user = await service.create(req.body);

  if (!user) {
    return res.status(409).json({
      status: "faild",
      data: "User already exists.!",
    });
  }

  return res.status(201).json({
    status: "success",
    data: user.rows[0],
  });
}

export async function login(req: Request, res: Response) {
  const user = await service.login(req.body);
  if (!user) {
    return res.status(404).json({
      status: "faild",
      data: "Your password or email is wrong.!",
    });
  }
  return res.status(200).json({
    status: "success",
    data: "You are loggedin successfuly.",
  });
}
