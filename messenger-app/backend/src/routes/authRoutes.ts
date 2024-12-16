import express from "express";
import jwt from "jsonwebtoken";
import {
  COOKIE_NAME,
  COOKIE_OPTIONS,
  JWT_SECRET_KEY,
  upload,
} from "../configs/configs";
import { hashPassword, comparePassword } from "../helpers/hashPassword";
import { generateToken, getToken } from "../helpers/jwtFunctions";
import { createUser, getUserByUsername } from "../services/userService";

const router = express.Router();

router.post("/signup", upload.none(), async (req, res) => {
  try {
    const user = await getUserByUsername(req.body.username);
    if (user) res.status(400).send("Username already exists");
    else {
      const hash = await hashPassword(req.body.password);
      await createUser({ ...req.body, password: hash });
      res.status(200).send("Created");
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
});

router.post("/login", upload.none(), async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (user) {
      const result = await comparePassword(password, user.password);
      if (result) {
        const token = generateToken({ username });
        res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
        res.status(200).send("Logged in");
      } else {
        res.status(401).send("Invalid credentials");
      }
    } else res.status(401).send("Invalid credentials");
  } catch (error) {
    console.error("Error during login:", error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.send("Logged out");
});

router.get("/check", (req, res) => {
  const token = getToken(req);
  if (!token) {
    res.status(401).send("Not authenticated");
  } else {
    try {
      jwt.verify(token, JWT_SECRET_KEY);
      res.status(200).send("Authenticated");
    } catch {
      res.status(401).send("Invalid token");
    }
  }
});

export default router;
