import type { Request, Response } from "express";
import service from "./service.js";

export async function createMembership(req: Request, res: Response) {
  const createMembership = await service.createMembership;

  if (!createMembership) {
    return res.status(400).json({
      status: "Fail",
      data: "The Membership creation going to fail. Try again later.!",
    });
  }
  return res.status(201).json({
    status: "Success",
    data: createMembership,
  });
}
