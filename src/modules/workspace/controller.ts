import type { Request, Response } from "express";
import service from "./service.js";

export async function createWorkspace(req: Request, res: Response) {
  const workspace = await service.createWorkspace(req.body, req.user.id);

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

export async function getAllWorkspaces(req: Request, res: Response) {
  const workspaces = await service.getAllWorkspaces();
  if (!workspaces) {
    return res.status(404).json({
      status: "Fail",
      data: "No workspaces found.!",
    });
  }
  return res.status(200).json({
    status: "Success",
    data: workspaces,
  });
}

export async function getOne(req: Request, res: Response) {
  const workspace = await service.getOne(req.params.id, req.user.id);
  if (!workspace) {
    return res.status(404).json({
      status: "Fail",
      data: "No workspace found.!",
    });
  }
  return res.status(200).json({
    status: "Success",
    data: workspace,
  });
}

export async function updateWorkspace(req: Request, res: Response) {
  const workspace = await service.update(req.body , req.params.id)
  if (!workspace) {
    return res.status(404).json({
      status: "Fail",
      data: "No workspace found.!",
    });
  }
  return res.status(200).json({
    status: "Success",
    data: workspace,
  });
}

export async function deleteWorkspace(req: Request, res: Response) {
  const workspase = await service.deleteWorkspace(req.params.id,req.user.id);
  if (!workspase) {
    return res.status(404).json({
      status: "Fail",
      data: "No workspace found.!",
    });
  }
  return res.status(200).json({
    status: "Success",
  });
}
