import type { Request, Response } from "express";

import service from "./service.js";
import { any } from "zod";

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
    data: user,
  });
}

export async function login(req: Request, res: Response) {
  const user = await service.login(req.body, res);
  if (!user) {
    return res.status(404).json({
      status: "faild",
      data: "Your password or email is wrong.!",
    });
  }
  return res.status(200).json({
    status: "success",
    data: user,
  });
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    status: "success",
    data: "Logged out successfully.",
  });
}