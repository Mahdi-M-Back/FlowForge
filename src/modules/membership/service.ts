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

export default {
  createMembership,
};
