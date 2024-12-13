import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

export const CLIENT_URL = process.env.CLIENT_URL;
export const PORT = process.env.PORT || 5000;
export const SECRET_KEY = process.env.SECRET_KEY;
export const EXPIRATION_TIME = "1h";
export const COOKIE_NAME = "token";
export const COOKIE_OPTIONS = { httpOnly: true };

export const upload = multer();
