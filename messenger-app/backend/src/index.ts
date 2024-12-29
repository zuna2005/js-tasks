import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CLIENT_URL, PORT } from "./configs/configs";
import { checkAuth } from "./helpers/jwtFunctions";
import { globalErrorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use(checkAuth);

// Global error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
