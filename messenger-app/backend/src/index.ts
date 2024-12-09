import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { checkAuth } from "./helpers/jwtFunctions";

dotenv.config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use(checkAuth);

app.get("/", (req, res) => {
  res.send("You accessed protected api!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
