import { Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
  details?: unknown;
}

export function globalErrorHandler(
  err: CustomError,
  req: Request,
  res: Response,
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    details: err.details || null,
  });

  console.error("Error:", err);
}
