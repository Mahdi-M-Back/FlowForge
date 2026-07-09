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

  return result.rows[0];
}

async function findByEmail(email: string) {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  return result.rows[0] ?? null;
}

export default {
  create,
  findByEmail,
};
