import express, { Request, Response } from "express";
import { getSnippets } from "../services/snippetServices";
import { getAuth } from "@clerk/express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { getUserId } from "./authHelper";

const router = express.Router();

// Get all snippets for authenticated user
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

// Get specific snippet by Id for authenticated user
router.get("/snippet/:id", () => {});
// Create snippet for authenticated user
router.post("/snippet/:id", () => {});
// Update snippet details for authenticated user
router.patch("/snippet/:id", () => {});
// Delete snippet By Id for authenticated user
router.delete("/snippet/:id", () => {});

export default router;
