import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),

  PORT: z.coerce.number().int().positive(),

  DATABASE_URL: z.url().startsWith("postgres"),

  JWT_SECRET_ACCESS: z.string().min(24),
  JWT_SECRET_REFRESH: z.string().min(32),
  JWT_SECRET_ACCESS_EXPIRES_IN: z.string().default("4h"),
  JWT_SECRET_REFRESH_EXPIRES_IN: z.string().default("30d"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables.");
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2));

  process.exit(1);
}

export const env = {
  env: {
    env: parsedEnv.data.NODE_ENV,
  },

  server: {
    port: parsedEnv.data.PORT,
  },

  db: {
    url: parsedEnv.data.DATABASE_URL,
  },

  jwt: {
    accessTokenSecret: parsedEnv.data.JWT_SECRET_ACCESS,
    refreshTokenSecret: parsedEnv.data.JWT_SECRET_REFRESH,
    accessTokenExpiresIn: parsedEnv.data.JWT_SECRET_ACCESS_EXPIRES_IN,
    refreshTokenExpiresIn: parsedEnv.data.JWT_SECRET_REFRESH_EXPIRES_IN,
  },
} as const;

export type Env = typeof env;
