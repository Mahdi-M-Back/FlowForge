import pool from "@/config/database.js";

import type { RegisterDto } from "./schema.js";

async function create(data: RegisterDto) {
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password)
    VALUES($1,$2,$3)
    RETURNING 
    id,
    name,
    email
    `,
    [data.name, data.email, data.password],
  );

  return result.rows[0];
}

async function findByEmail(email: string) {
  const result = await pool.query(
    `
    SELECT 
    id,
    name,
    email,
    password
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  return result.rows[0] ?? null;
}

async function findByRefreshToken(refreshToken: string) {
  const result = await pool.query(
    `
    SELECT 
    id
    FROM users
    WHERE refresh_token = $1
    `,
    [refreshToken],
  );

  return result.rows[0] ?? null;
}

async function updateRefreshToken(userId: string, refreshToken: string) {
  const result = await pool.query(
    `
    UPDATE users
    SET refresh_token = $1
    WHERE id = $2
    `,
    [refreshToken, userId],
  );
  return result.rows[0] ?? null;
}


export default {
  create,
  findByEmail,
  findByRefreshToken,
  updateRefreshToken,
};
