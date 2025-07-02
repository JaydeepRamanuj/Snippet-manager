import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  createFolder,
  deleteFolder,
  getFolderDetails,
  updateFolder,
} from "../services/folderServices";
import { convertToMongoDBObjectId } from "./routeHelper";

const router = express.Router();

// Get all folders for authenticated user
router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const folders = await getFolderDetails({ type: "all", userId });
    if (folders) {
      res.status(200).json(folders);
    } else {
      res.status(500).send("Failed to fetch folders.");
    }
  } catch (error) {
    console.error("Error getting folders:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Get specific folder by Id for authenticated user
router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const folder = await getFolderDetails({
      type: "specific",
      userId,
      id: convertToMongoDBObjectId(id),
    });
    if (folder) {
      res.status(200).json(folder);
    } else {
      res.status(500).send("Failed to fetch folder.");
    }
  } catch (error) {
    console.error("Error getting folder:", error);
    res.status(500).send("Internal Server Error.");
  }
});
// Create folder for authenticated user
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const newFolder = req.body;

    if (!newFolder) return res.status(400).send("Bad Request.");

    if (!newFolder.name || !newFolder.userId) {
      return res.status(400).send("Missing required fields.");
    }

    const createResponse = await createFolder(newFolder);

    if (createResponse) {
      res.status(201).send({ message: "Folder created", data: createResponse });
    } else {
      res.status(500).send("Failed to create folder.");
    }
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).send("Internal Server Error.");
  }
});
// Update folder details for authenticated user
router.patch("/:id", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const { id } = req.params;

  const folderPart = req.body;
  if (!folderPart) return res.status(400).send("Bad Request.");

  const deleteResponse = await updateFolder({
    id: convertToMongoDBObjectId(id),
    folder: folderPart,
    userId,
  });
  if (deleteResponse) {
    res.status(200).send("Folder updated");
  } else {
    res.status(500).send("Failed to updated folder.");
  }
});
// Delete folder By Id for authenticated user
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const { id } = req.params;

  const deleteResponse = await deleteFolder({
    id: convertToMongoDBObjectId(id),
    userId,
  });
  if (deleteResponse) {
    res.status(200).send("Folder Deleted");
  } else {
    res.status(500).send("Failed to delete folder.");
  }
});

export default router;
