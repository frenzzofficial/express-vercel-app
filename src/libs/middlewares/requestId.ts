import { v4 as uuidv4 } from "uuid";
import type { Request, Response, NextFunction } from "express";

// By using declaration merging on the Response object, we can provide
// type-safety for res.locals. This is a more stable pattern than
// modifying the Request object directly, especially in serverless environments.
declare global {
  namespace Express {
    export interface Response {
      locals: {
        requestId: string;
      };
    }
  }
}

/**
 * Express middleware to assign a unique ID to each incoming request.
 * It checks for an existing 'x-request-id' header. If not found, a new
 * UUID is generated. The ID is attached to the response header and
 * stored in `res.locals` for downstream use.
 *
 * Using `res.locals` is the recommended, standard way to pass request-scoped
 * data in Express and is more reliable in serverless environments like Vercel.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 */
const requestIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Check for an existing request ID in the headers, otherwise generate a new one.
  const incomingId = req.headers["x-request-id"];
  const requestId =
    typeof incomingId === "string" && incomingId.trim() !== ""
      ? incomingId
      : uuidv4();

  // Set the request ID on the response header for client-side tracking.
  res.setHeader("X-Request-ID", requestId);

  // Attach the request ID to res.locals instead of the request object.
  // This is the idiomatic Express pattern and avoids potential issues with
  // modifying the request object in certain environments.
  res.locals.requestId = requestId;

  next();
};

export default requestIdMiddleware;

