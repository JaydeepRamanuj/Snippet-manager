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
