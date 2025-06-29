import express, { Request, Response } from "express";
import { getSnippets } from "../services/snippetServices";
import { getAuth } from "@clerk/express";

const router = express.Router();

// Get all user data
router.get("/", async (req: Request, res: Response) => {
  try {
    // Getting userId from clerk
    const { userId } = getAuth(req);

    // Use Clerk's JavaScript Backend SDK to get the user's User object
    // const user = await clerkClient.users.getUser(userId)

    if (!userId) {
      return res.status(401).send("Unauthorized: User ID not found.");
    }

    const snippets = await getSnippets({
      type: "all",
      userId: userId,
    });
    if (snippets) {
      res.status(200).json(snippets);
    } else {
      res.status(500).send("Failed to fetch snippets.");
    }
  } catch (error) {
    console.error("Error getting snippets:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Get specific user by Id
router.get("/folder/:id", async (req, res) => {
  // Getting userId from clerk
  const { userId } = getAuth(req);

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  // const user = await clerkClient.users.getUser(userId)

  if (!userId) {
    return res.status(401).send("Unauthorized: User ID not found.");
  }
});
// Create user
router.post("/folder/:id", async (req, res) => {
  // Getting userId from clerk
  const { userId } = getAuth(req);

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  // const user = await clerkClient.users.getUser(userId)

  if (!userId) {
    return res.status(401).send("Unauthorized: User ID not found.");
  }
});
// Update user details
router.patch("/folder/:id", async (req, res) => {
  // Getting userId from clerk
  const { userId } = getAuth(req);

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  // const user = await clerkClient.users.getUser(userId)

  if (!userId) {
    return res.status(401).send("Unauthorized: User ID not found.");
  }
});
// Delete user By Id
router.delete("/folder/:id", async (req, res) => {
  // Getting userId from clerk
  const { userId } = getAuth(req);

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  // const user = await clerkClient.users.getUser(userId)

  if (!userId) {
    return res.status(401).send("Unauthorized: User ID not found.");
  }
});

export default router;
