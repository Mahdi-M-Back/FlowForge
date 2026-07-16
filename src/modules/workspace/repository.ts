import pool from "@/config/database.js";
import type { WorkspaceDto, UpdateWorkspaceDto } from "./schema.js";

async function createWorkspace(data: WorkspaceDto, id: string) {
  const result = await pool.query(
    `
    INSERT INTO workspaces(name,owner_id,created_at,description)
    VALUES($1,$2,$3,$4)
    RETURNING 
    id,
    name,
    description,
    owner_id,
    created_at
    
    `,
    [data.name, id, new Date(), data.description],
  );
  return result.rows[0] ?? null;
}

async function getAllWorkspaces(id: string) {
  const result = await pool.query(
    `
    SELECT
    id,
    name,
    description,
    owner_id
    FROM workspaces
    WHERE owner_id = $1 AND is_deleted = false
    `,
    [id],
  );
  return result.rows ?? null;
}

async function getOne(id: string) {
  const result = await pool.query(
    `
    SELECT name, owner_id FROM workspaces
    WHERE id = $1::uuid;
    `,
    [id],
  );
  return result.rows[0] ?? null;
}

async function update(data: UpdateWorkspaceDto, id: string) {
  const result = await pool.query(
    `
    UPDATE workspaces
    SET 
      name = $1,
      description = $2
    WHERE id = $3
    RETURNING id, name, description
    `,
    [data.name, data.description, id],
  );
  return result.rows[0] ?? null;
}

async function softDelete(id: string) {
  const result = await pool.query(
    `
    UPDATE workspaces
    SET 
      is_deleted = true,
      deleted_at = $1
    WHERE id = $2
    RETURNING name
    `,
    [new Date(), id],
  );
  return result.rows[0] ?? null;
}

export default {
  createWorkspace,
  getAllWorkspaces,
  getOne,
  update,
  softDelete,
};
