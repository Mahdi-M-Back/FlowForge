import repository from "./repository.js";

async function createMembership(workspace_id: string, body: object) {
  const createMembership = await repository.createMembership(
    workspace_id,
    body,
  );
  if (!createMembership) {
    return false;
  }
  return createMembership;
}

async function getAll(id: string) {
  const result = await repository.getAll(id);
  if (!result) {
    return false;
  }
  return result;
}

export default {
  createMembership,
  getAll,
};
