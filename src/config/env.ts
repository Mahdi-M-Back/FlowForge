import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),

  PORT: z.coerce.number().int().positive(),

  DATABASE: z.url().startsWith("postgres"),

  JWT_SECRET: z.string().min(32),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables.");
  console.error(
  JSON.stringify(parsedEnv.error.format(), null, 2)
);

  process.exit(1);
}

export const env = {
  env: {
    env: parsedEnv.data.NODE_ENV,
  },

  server: {
    port: parsedEnv.data.PORT,
  },

  database: {
    url: parsedEnv.data.DATABASE,
  },

  jwt: {
    secret: parsedEnv.data.JWT_SECRET,
  },
} as const;

export type Env = typeof env;