import { Pool } from "pg";

export async function createDatabase(connectionString: string) {
  const pool = new Pool({
    connectionString,
  });

  try {
    await pool.query("SELECT 1");
  } catch (error) {
    throw new Error("Failed to initialize database connection.", {
      cause: error,
    });
  }

  return pool;
}