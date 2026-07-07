import "dotenv/config";

export default {
  migrationsTable: "pgmigrations",
  dir: "migrations",
  databaseUrl: process.env.DATABASE_URL,
};
