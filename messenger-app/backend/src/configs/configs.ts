import dotenv from "dotenv";
import multer from "multer";
import { Algorithm } from "jsonwebtoken";

dotenv.config();

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("Please provide JWT_SECRET_KEY environment variable");
}
if (!process.env.CLIENT_URL) {
  throw new Error("Please provide CLIENT_URL environment variable");
}

export const CLIENT_URL = process.env.CLIENT_URL;
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const JWT_EXPIRATION_TIME = "1h";
export const JWT_HASH_ALGORITHMS: Algorithm[] = ["HS256"];
export const COOKIE_NAME = "token";
export const COOKIE_OPTIONS = { httpOnly: true };
export const HASH_SALT_ROUNDS = 10;

export const upload = multer();
