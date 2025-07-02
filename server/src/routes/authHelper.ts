import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { getAuth } from "@clerk/express";
import { Request, Response } from "express";

export function getUserId(req: Request, res: Response) {
  // Getting userId from clerk
  const { userId } = getAuth(req);

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  // const user = await clerkClient.users.getUser(userId)

  if (!userId) {
    return res.status(401).send("Unauthorized: User ID not found.");
  }

  return userId;
}

// This will help standardize the response
export type ResponseType = {
  status: number;
  message: string;
  data?: any;
  error?: any;
};

// Standardized successResponse
// but don't forget to send actual response object

export function successResponse(
  res: Response,
  message: string,
  data?: any,
  status = 200
) {
  return res.status(status).json({ status, message, data });
}

// Standardized error Response
export function errorResponse(
  res: Response,
  message: string,
  status = 500,
  error?: any
) {
  return res.status(status).json({ status, message, error });
}
