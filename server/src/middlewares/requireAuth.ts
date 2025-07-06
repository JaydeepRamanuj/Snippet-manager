import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Attaching userId to request object so we can access it inside route methods
  (req as any).userId = userId;
  next();
}
