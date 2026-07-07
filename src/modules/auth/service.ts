import repository from "./repository.js";
import { registerSchema } from "./schema.js";
import bcrypt from "bcrypt";

async function create(data: unknown) {
  const validated = registerSchema.parse(data);
  const password = await bcrypt.hash(validated.password, 12);
  validated.password = password;
  const user = await repository.create(validated);

  return user;
}

export default {
  create,
};
