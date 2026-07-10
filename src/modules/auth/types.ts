import { z } from "zod";
import { registerSchema } from "./schema.js";

export type RigesterDto = z.infer<typeof registerSchema>;

export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  role: "user" | "admin" | "owner",
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}
