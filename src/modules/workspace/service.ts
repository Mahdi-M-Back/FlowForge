import repository from "./repository.js";
import type { WorkspaceDto } from "./schema.js";

async function createWorkspace(data: WorkspaceDto, userId: string) {
  const result = await repository.createWorkspace(data, userId);
  return result;
}

async function getAllWorkspaces() {
  const result = await repository.getAllWorkspaces();
  return result;
}

async function getOne(params: string, owner_id: string) {
  const result = await repository.getOne(params);
  if (!(owner_id === result.owner_id)) {
    return false;
  }
  return result.name;
}

export default {
  createWorkspace,
  getAllWorkspaces,
  getOne,
};
