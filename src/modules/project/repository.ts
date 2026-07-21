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

export default {
  create,
};
