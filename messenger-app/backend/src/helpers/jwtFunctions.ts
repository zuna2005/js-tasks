import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

const SECRET_KEY = process.env.SECRET_KEY;

type TokenPayload = {
  username: string;
};

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, SECRET_KEY as string, { expiresIn: "1h" });
}

export const checkAuth = expressjwt({
  secret: SECRET_KEY as string,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.token,
}).unless({ path: ["/auth"] });
