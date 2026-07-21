import { create } from "node:domain";
import repository from "./repository.js";

async function createProject(body: object, workspaceId: string) {
  const createProject = await repository.create(body, workspaceId);
  if (!createProject) {
    return false;
  }
  return createProject;
}

async function porjects(workspaceId: string) {
  const porjects = await repository.getAll(workspaceId);
  if (!porjects) {
    return false;
  }
  return porjects;
}

async function porject(workspaceId: string,id:string) {
  const porject = await repository.getOne(workspaceId,id);
  if (!porject) {
    return false;
  }
  return porject;
}

export default {
  createProject,
  porjects,
  porject,
};
