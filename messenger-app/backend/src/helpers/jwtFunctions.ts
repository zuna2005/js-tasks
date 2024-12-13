import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { EXPIRATION_TIME, SECRET_KEY } from "../configs/configs";

interface TokenPayload {
  username: string;
};

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, SECRET_KEY as string, { expiresIn: EXPIRATION_TIME });
}

export const checkAuth = expressjwt({
  secret: SECRET_KEY as string,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.token,
}).unless({ path: ["/auth"] });
