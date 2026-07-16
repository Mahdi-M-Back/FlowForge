import repository from "./repository.js";
import { workspaceSchema } from "./schema.js";

async function createWorkspace(data: unknown, userId: string) {
  const parsedData = workspaceSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("Invalid workspace data");
  }
  const result = await repository.createWorkspace(parsedData.data, userId);
  return result;
}

async function getAllWorkspaces(userId: string) {
  const result = await repository.getAllWorkspaces(userId);
  return result;
}

async function getOne(params: string, owner_id: string) {
  const result = await repository.getOne(params);
  if (!result) {
    return false;
  }
  if (!(owner_id === result.owner_id)) {
    return false;
  }
  return result.name;
}

async function update(data: unknown, params: string) {
  const parsedData = workspaceSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("Invalid workspace data");
  }
  const result = await repository.update(parsedData.data, params);
  if (!result) {
    return false;
  }
  return result;
}

async function deleteWorkspace(params: string, owner_id: string) {
  const result = await repository.getOne(params);
  if (!(owner_id === result.owner_id)) {
    return false;
  }
  await repository.softDelete(params);
  return true;
}

export default {
  createWorkspace,
  getAllWorkspaces,
  getOne,
  update,
  deleteWorkspace,
};
