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

export default {
  createMembership,
};
