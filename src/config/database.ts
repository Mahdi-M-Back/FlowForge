import { Pool } from "pg";
import { env } from "./env.js";

const pool = new Pool({
  connectionString: env.db.url,
});

export async function connectToDB() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected.");
  } catch (error) {
    throw new Error("Failed to initialize database connection.", {
      cause: error,
    });
  }
}

export default pool;
