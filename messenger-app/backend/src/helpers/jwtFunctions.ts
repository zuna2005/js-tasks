import jwt from "jsonwebtoken";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import {
  JWT_COOKIE_NAME,
  JWT_EXPIRATION_TIME,
  JWT_HASH_ALGORITHMS,
  JWT_SECRET_KEY,
} from "../configs/configs";

interface TokenPayload {
  username: string;
}

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME });
}

export const getToken = (req: JWTRequest) => req.cookies[JWT_COOKIE_NAME];

export const checkAuth = expressjwt({
  secret: JWT_SECRET_KEY,
  algorithms: JWT_HASH_ALGORITHMS,
  getToken,
}).unless({ path: ["/auth"] });
