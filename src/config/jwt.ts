import jwt from "jsonwebtoken";
import { env } from "./env.js";
import authRepo from"@/modules/auth/repository.js"

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

async function protect(req: any, res: any, next: any) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({
      status: "faild",
      data: "Unauthorized access.",
    });
  }
  let decoded: any;
  const token = req.headers.authorization.split(" ")[1];
  try {
    decoded = await jwt.verify(token, env.jwt.accessTokenSecret);
  } catch (error) {
    return res.status(401).json({
      status: "faild",
      data: "You are not logged in. Please log in to get access.",
    });
  }
  const currentuser = await authRepo.findById(decoded.userId);
  if (!currentuser) {
    return res.status(404).json({
      status: "faild",
      data: "User not found.",
    }); 
  }
    
  req.user = currentuser;
  console.log("user role:", currentuser.role);
  next();
}

function restrictTo(...roles: string[]) {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "faild",
        data: "You are not authorized to perform this action.",
      });
    }
    next();
  };
}

export default {
  generateTokens,
  generateAccessTokens,
  protect,
  restrictTo,
};
