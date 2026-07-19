import pool from "@/config/database.js";

async function createMembership(workspace_id: string, body: object) {
  const result = await pool.query(
    `
    INSERT INTO membership(user_id,workspace_id,role)
    VALUES($1,$2,$3)
    RETURNING 
    id,
    user_id,
    workspace_id,
    role
    `,
    [body.user_id, workspace_id, body.role],
  );
  return result.rows[0] ?? null;
}

async function getAll(id: string) {
  const result = await pool.query(
    `
    SELECT user_id, role FROM membership
    WHERE workspace_id = $1 AND is_deleted = false
    `,
    [id],
  );
  return result.rows[0] ?? null;
}

async function getById(id: string) {
  const result = await pool.query(
    `
    SELECT role FROM membership
    WHERE user_id = $1 AND is_deleted = false
    `,
    [id],
  );
  return result.rows[0] ?? null;
}

async function updateRole(id: string, role: string) {
  const result = await pool.query(
    `
    UPDATE membership
    SET
      role = $1
    WHERE user_id = $2
    RETURNING id, role
    `,
    [role, id],
  );
  return result.rows[0] ?? null;
}

export default {
  createMembership,
  getAll,
  getById,
  updateRole,
};
