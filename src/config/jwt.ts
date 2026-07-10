import jwt from "jsonwebtoken";
import { env } from "./env.js";

const accessToken = (userId: string) => {
  const expiresIn = env.jwt.accessTokenExpiresIn;
  return jwt.sign({ userId }, env.jwt.accessTokenSecret, { expiresIn });
};

const refreshToken = (userId: string) => {
  const expiresIn = env.jwt.refreshTokenExpiresIn;
  return jwt.sign({ userId }, env.jwt.refreshTokenSecret, { expiresIn });
};

function generateTokens(userId: string, res: any) {
  const access = accessToken(userId);
  const refresh = refreshToken(userId);

  res.cookie("refreshToken", refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  });

  return { access, refresh };
}

function generateAccessTokens(userId: string, refreshToken: string) {
  try {
    jwt.verify(refreshToken, env.jwt.refreshTokenSecret) as jwt.JwtPayload;
    const access = accessToken(userId);

    return { access };
  } catch (err) {
    return false;
  }
}

function protect(req: any, res: any, next: any) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    return res.status(401).json({
      status: "faild",
      data: "Unauthorized access.",
    });
  }
  let decoded: any;
  const token = req.headers.authorization.split(" ")[1];
  try {
    decoded = jwt.verify(token, env.jwt.accessTokenSecret) ;
  } catch (error) {
    return res.status(401).json({
      status: "faild",
      data: "You are not logged in. Please log in to get access.",
    });
  }
  req.userId = decoded.userId;
  next();
}


export default {
  generateTokens,
  generateAccessTokens,
  protect,
};
