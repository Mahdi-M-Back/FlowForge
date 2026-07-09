import jwt from "jsonwebtoken";
import { env } from "./env.js";


const accessToken = (userId: string) => {
  const expiresIn = env.jwt.accessTokenExpiresIn;
  return jwt.sign({ userId }, env.jwt.accessTokenSecret, { expiresIn });
};

const refreshToken = (userId: string) => {
  const expiresIn = env.jwt.refreshTokenExpiresIn;
  return jwt.sign({ userId }, env.jwt.refreshTokenSecret, { expiresIn });
}


export function generateTokens(userId: string, res: any) {
  const access = accessToken(userId);
  const refresh = refreshToken(userId);

  res.cookie("refreshToken", refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  });

  return { access };
}
