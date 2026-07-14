import pool from "@/config/database.js";

async function createWorkspace(data: any, id: string) {
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

async function getAllWorkspaces() {
  const result = await pool.query(
    `
    SELECT
    id,
    name,
    description,
    owner_id
    FROM workspaces
    `,
  );
  return result.rows ?? null;
}

async function getOne(id:string) {
  const result = await pool.query(
    `
    SELECT name, owner_id FROM workspaces
    WHERE id = $1::uuid;
    `,
    [id]
  )
  return result.rows[0] ?? null
  
}

export default {
  createWorkspace,
  getAllWorkspaces,
  getOne,
};
