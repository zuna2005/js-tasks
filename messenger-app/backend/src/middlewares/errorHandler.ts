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
  // Default status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Send the error response
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    details: err.details || null,
  });

  // Log the error for debugging (optional)
  console.error("Error:", err);
}
