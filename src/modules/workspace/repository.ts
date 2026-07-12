import pool from "@/config/database.js";

async function createWorkspace(data:any , id:string) {
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

export default {
  createWorkspace,
}