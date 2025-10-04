// libs/middlewares/requestId.ts
import { v4 as uuidv4 } from "uuid";
import type { Request, Response, NextFunction } from "express";

const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const incomingId = req.headers["x-request-id"];
  const requestId =
    typeof incomingId === "string" && incomingId.trim() !== "" ? incomingId : uuidv4();

  req.headers["x-request-id"] = requestId;
  res.setHeader("X-Request-ID", requestId);

  // Optional: attach to req object for logging
  (req as any).requestId = requestId;

  next();
};

export default requestIdMiddleware;
