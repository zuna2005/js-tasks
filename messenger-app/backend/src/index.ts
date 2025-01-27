import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import usersRoutes from "./routes/usersRoutes";
import { checkAuth } from "./helpers/jwtFunctions";
import { CLIENT_URL, PORT } from "./configs/configs";

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRoutes);
app.use(checkAuth);
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
