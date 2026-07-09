import jwt from "@/config/jwt.js";
import repository from "./repository.js";
import { loginSchema, registerSchema } from "./schema.js";
import bcrypt from "bcrypt";

async function create(data: unknown) {
  const validated = registerSchema.parse(data);
  const existingUser = await repository.findByEmail(validated.email);
  if (existingUser) {
    return false;
  }
  const password = await bcrypt.hash(validated.password, 12);
  validated.password = password;
  const user = await repository.create(validated);

  return user;
}

async function login(data: unknown, res: Response) {
  const validated = loginSchema.parse(data);

  const user = await repository.findByEmail(validated.email);
  if (!user) {
    return false;
  }

  const confirmPass = await bcrypt.compare(validated.password, user.password);
  if (!confirmPass) {
    return false;
  }
  user.password = undefined;
  const tokens = await jwt.generateTokens(user.id, res);
  const accessToken = tokens.access;
  const refreshToken = tokens.refresh;
  await repository.updateRefreshToken(user.id, refreshToken);
  console.log(await repository.findByEmail(validated.email));

  return { user, accessToken };
}

async function refreshToken(refreshToken: string) {
  const user = await repository.findByRefreshToken(refreshToken);
  if (!user) {
    return false;
  }

  const tokens = await jwt.generateAccessTokens(user.id);

  return tokens;
}

export default {
  create,
  login,
  refreshToken,
};
