import pool from "@/config/database.js";

async function create(body: object, workspaceId: string) {
  const result = await pool.query(
    `
    INSERT INTO projects(name,description,workspace_id)
    VALUES($1,$2,$3)
    RETURNING
    id,
    name,
    description,
    workspace_id
    `,
    [body.name, body.description, workspaceId],
  );
  return result.rows[0] ?? null;
}

async function getAll(workspaceId: string) {
  const result = await pool.query(
    `
    SELECT
    id,
    name,
    description
    FROM projects
    WHERE workspace_id = $1 AND is_deleted = false
    `,
    [workspaceId],
  );
  return result.rows[0] ?? null;
}

async function getOne(workspaceId: string, id: string) {
  const result = await pool.query(
    `
    SELECT
    name,
    description
    FROM projects
    WHERE workspace_id = $1 AND id = $2 AND is_deleted = false
    `,
    [workspaceId, id],
  );
  return result.rows[0] ?? null;
}

export default {
  create,
  getAll,
  getOne,
};
