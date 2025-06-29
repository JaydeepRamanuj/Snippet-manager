import express, { Request, Response } from "express";
import { getSnippets } from "../services/snippetServices";
import { getAuth } from "@clerk/express";

const router = express.Router();

// Get all folders for authenticated user
router.get("/", async (req: Request, res: Response) => {
  try {
    // Getting userId from clerk and inferring it to string
    const { userId } = getAuth(req);

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

// Get specific folder by Id for authenticated user
router.get("/folder/:id", () => {});
// Create folder for authenticated user
router.post("/folder/:id", () => {});
// Update folder details for authenticated user
router.patch("/folder/:id", () => {});
// Delete folder By Id for authenticated user
router.delete("/folder/:id", () => {});

export default router;
