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

async function getMembership(id: string) {
  const result = await repository.getById(id);
  if (!result) {
    return false;
  }
  return result;
}

async function updateMembership(id: string, role: string) {
  const result = await repository.updateRole(id, role);
  if (!result) {
    return false;
  }
  return result;
}

async function deleteMembership(id: string) {
  const result = await repository.deleteMembership(id);
  if (!result) {
    return false;
  }
  return true;
}

export default {
  createMembership,
  getAll,
  getMembership,
  updateMembership,
  deleteMembership,
};
