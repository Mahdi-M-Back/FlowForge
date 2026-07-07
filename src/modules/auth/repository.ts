import pool from "@/config/database.js";

import type { RegisterDto } from "./schema.js";

async function create(data: RegisterDto) {
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password)
    VALUES($1,$2,$3)
    RETURNING *
    `,
    [data.name, data.email, data.password],
  );

  return result;
}

export default {
  create,
};
