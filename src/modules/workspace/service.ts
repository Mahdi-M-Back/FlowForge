import repository from "./repository.js";
import type { WorkspaceDto } from "./schema.js";

async function createWorkspace(data: WorkspaceDto, userId: string) {
  const result = await repository.createWorkspace(data,userId);
  return result;
}


export default {
  createWorkspace,
}