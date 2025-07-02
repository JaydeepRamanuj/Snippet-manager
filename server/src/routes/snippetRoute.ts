import express, { Request, Response } from "express";
import {
  createSnippet,
  deleteSnippet,
  getSingleSnippet,
  getSnippets,
  updateSnippet,
} from "../services/snippetServices";
import { ObjectId } from "mongodb";
import { convertToMongoDBObjectId } from "./routeHelper";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

// Get all snippets for authenticated user
router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    // Keeping below code as backup as I'm moving auth logic to middleware

    // Getting userId from clerk
    // const { userId } = getAuth(req);

    // Use Clerk's JavaScript Backend SDK to get the user's User object
    // const user = await clerkClient.users.getUser(userId)

    // if (!userId) {
    //   return res.status(401).send("Unauthorized: User ID not found.");
    // }

    // Now I can directly access userId from req object
    // because requireAuth has injected it

    const userId = (req as any).userId;
    const { limit } = (req as Request).query;
    console.log("userId =>", userId);

    console.log(limit);

    const snippets = await getSnippets({
      type: "all",
      userId: userId,
      limit: Number(limit),
    });
    if (snippets) {
      res.status(200).json(snippets);
    } else {
      res.status(404).send("Snippets not found.");
    }
  } catch (error) {
    console.error("Error getting snippets:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Get specific snippet by Id for authenticated user
router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = (req as any).userId;

    const snippet = await getSingleSnippet(
      convertToMongoDBObjectId(id),
      userId
    );
    if (snippet) {
      res.status(200).json(snippet);
    } else {
      res.status(404).send("snippet not found.");
    }
  } catch (error) {
    console.log("Error creating snippet", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Create snippet for authenticated user
// router.post("/snippet", requireAuth, async (req: Request, res: Response) => {
router.post("/", async (req: Request, res: Response) => {
  try {
    const newSnippet = req.body;

    console.log("newSnippet =>", newSnippet);

    if (!newSnippet) return res.status(400).send("Bad Request.");

    if (!newSnippet.title || !newSnippet.language) {
      return res.status(400).send("Missing required fields.");
    }

    const createResponse = await createSnippet(newSnippet);

    if (createResponse) {
      // status 201 => created
      res
        .status(201)
        .send({ message: "Snippet created", data: createResponse });
    } else {
      res.status(500).send("Failed to create snippet.");
    }
  } catch (error) {
    console.log("Error getting snippet", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Update snippet details for authenticated user
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const snippetPart = req.body;
    if (!snippetPart) return res.status(400).send("Bad Request.");

    const userId = (req as any).userId;

    const updateResponse = await updateSnippet(
      convertToMongoDBObjectId(id),
      userId,
      snippetPart
    );
    if (updateResponse) {
      res.status(200).send("Snippet updated");
    } else {
      res.status(500).send("Failed to update snippet.");
    }
  } catch (error) {
    console.log("Error updating snippet", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Delete snippet By Id for authenticated user
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = (req as any).userId;

    const deleteResponse = await deleteSnippet(
      convertToMongoDBObjectId(id),
      userId
    );
    if (deleteResponse) {
      res.status(200).send("Snippet deleted");
    } else {
      res.status(500).send("Failed to delete snippet.");
    }
  } catch (error) {
    console.log("Error deleting snippet", error);
    res.status(500).send("Internal Server Error.");
  }
});

export default router;
