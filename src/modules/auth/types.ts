import { z } from "zod";
import { registerSchema } from "./schema.js";

export type RigesterDto = z.infer<typeof registerSchema>;

export interface User {
  id: string;
  name: string;
  password: string;
}
