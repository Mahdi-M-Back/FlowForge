import type { Request, Response } from "express";
import service from "./service.js";

export async function createProject(req: Request, res: Response) {
  const createProject = await service.createProject(req.body, req.params.wid);
  if (!createProject) {
    return res.status(400).json({
      status: "Faild",
      data: "Have a problem.! please try again later:)",
    });
  }
  return res.status(201).json({
    status: "Success",
    data: createProject,
  });
}

export async function getAllProject(req: Request, res: Response) {
  const porjects = await service.porjects(req.params.wid);
  if (!porjects) {
    return res.status(400).json({
      status: "Faild",
      data: "Have a problem.! please try again later:)",
    });
  }
  return res.status(201).json({
    status: "Success",
    data: porjects,
  });
}

export async function getOne(req: Request, res: Response) {
  const porject = await service.porject(req.params.wid,req.params.id);
  if (!porject) {
    return res.status(400).json({
      status: "Faild",
      data: "Have a problem.! please try again later:)",
    });
  }
  return res.status(201).json({
    status: "Success",
    data: porject,
  });
}
