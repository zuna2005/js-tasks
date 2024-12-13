import express from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME, COOKIE_OPTIONS, SECRET_KEY, upload } from "../configs/configs";
import { hashPassword, comparePassword } from "../helpers/hashPassword";
import { generateToken } from "../helpers/jwtFunctions";
import { createUser, getUserByUsername } from "../services/userService";

const router = express.Router();

router.post("/signup", upload.none(), (req, res) => {
  getUserByUsername(req.body.username).then((user) => {
    if (user) res.status(400).send("Username already exists");
    else {
      hashPassword(req.body.password)
        .then((hash) => createUser({ ...req.body, password: hash }))
        .then(() => res.status(200).send("Created"));
    }
  });
});

router.post("/login", upload.none(), (req, res) => {
  const { username, password } = req.body;
  getUserByUsername(username).then((user) => {
    if (user) {
      comparePassword(password, user.password).then((result) => {
        if (result) {
          const token = generateToken({ username });
          res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
          res.status(200).send("Logged in");
        } else {
          res.status(401).send("Invalid credentials");
        }
      });
    } else res.status(401).send("Invalid credentials");
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.send("Logged out");
});

router.get("/check", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Not authenticated");
  }
  else {
    try {
      jwt.verify(token, SECRET_KEY as string);
      res.status(200).send("Authenticated");
    } catch {
      res.status(401).send("Invalid token");
    }
  }
});

export default router;
