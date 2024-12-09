import express from "express";
import multer from "multer";
import { hashPassword, comparePassword } from "../helpers/hashPassword";
import { createUser, getUserByUsername } from "../services/userService";
import { generateToken } from "../helpers/jwtFunctions";

const router = express.Router();
const upload = multer();

router.post("/signup", upload.none(), (req, res) => {
  getUserByUsername({ username: req.body.username })
    .then(() => res.status(400).send("Username already exists"))
    .catch(() => {
      hashPassword(req.body.password)
        .then((hash) => createUser({ ...req.body, password: hash }))
        .then(() => res.status(200).send("Created"));
    });
});

router.post("/login", upload.none(), (req, res) => {
  const { username, password } = req.body; 
  getUserByUsername({ username })
    .then((user) => comparePassword(password, user.password))
    .then((result) => {
      if (result) {
        const token = generateToken({ username });
        res.cookie("token", token, { httpOnly: true });
        res.status(200).send("Logged in");
      } else {
        res.status(401).send("Invalid credentials");
      }
    })
    .catch(() => res.status(401).send("Invalid credentials"));
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged out");
});

router.get("/check", (req, res) => {
  if (req.cookies.token) {
    res.status(200).send("Authenticated");
  } else {
    res.status(401).send("Not authenticated");
  }
});


export default router;
