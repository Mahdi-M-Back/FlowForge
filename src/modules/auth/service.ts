import repository from "./repository.js";
import { loginSchema, registerSchema } from "./schema.js";
import bcrypt from "bcrypt";

async function create(data: unknown) {
  const validated = registerSchema.parse(data);
  const password = await bcrypt.hash(validated.password, 12);
  validated.password = password;
  const user = await repository.create(validated);

  return user;
}

async function login(data: unknown) {
  const validated = loginSchema.parse(data);

  const user = await repository.findByEmail(validated.email);

  if (!user) {
    return false;
  }

  const confirmPass = await bcrypt.compare(validated.password, user.password);

  if (!confirmPass) {
    return false;
  }

  return true;
}

export default {
  create,
  login,
};
