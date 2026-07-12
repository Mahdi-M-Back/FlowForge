import type { Request, Response } from "express";
import service from "./service.js";



export async function createWorkspace(req: Request, res: Response) {
  const workspace = await service.createWorkspace(req.body, req.userId);
  if (!workspace) {
    return res.status(400).json({
      status: "Fail",
      data: "The workspace creation going to fail. Try again later.!",
    });
  } 
  return res.status(201).json({
    status: "Success",
    data: workspace,
  });
}