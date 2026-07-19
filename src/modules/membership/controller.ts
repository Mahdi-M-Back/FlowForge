import type { Request, Response } from "express";
import service from "./service.js";
import { log } from "console";

export async function createMembership(req: Request, res: Response) {
  const createMembership = await service.createMembership(
    req.params.id,
    req.body,
  );

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

export async function getAllMembership(req: Request, res: Response) {
  const result = await service.getAll(req.params.id);
  if (!result) {
    return res.status(404).json({
      status: "Faild",
      data: "Can not find any Membership",
    });
  }
  return res.status(200).json({
    status: "Success",
    data: result,
  });
}

export async function getMembership(req: Request, res: Response) {
  const result = await service.getMembership(req.params.userId);
  if (!result) {
    return res.status(404).json({
      status: "Faild",
      data: "Can not find Membership",
    });
  }
  return res.status(200).json({
    status: "Success",
    data: result,
  });
}

export async function updateMembership(req: Request, res: Response) {
  const result = await service.updateMembership(
    req.params.userId,
    req.body.role,
  );

  if (!result) {
    return res.status(404).json({
      status: "Faild",
      data: "Can not find Membership",
    });
  }
  return res.status(200).json({
    status: "Success",
    data: result,
  });
}

export async function deleteMembership(req: Request, res: Response) {
  const result = await service.deleteMembership(req.params.userId);

  if (!result) {
    return res.status(404).json({
      status: "Faild",
      data: "Can not find Membership",
    });
  }
  return res.status(200).json({
    status: "Success",
  });
}
