import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  createUser,
  deleteUser,
  getUserDetail,
  updateUser,
} from "../services/userServices";
import { toObjectId } from "./routeHelper";

const router = express.Router();

// Get specific user by Id
router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const user = await getUserDetail(toObjectId(id));

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(500).send("Failed to fetch user.");
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Create user
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = req.body;

    if (!user) return res.status(400).send("Bad Request.");

    if (!user.name || !user.userId) {
      return res.status(400).send("Missing required fields.");
    }

    const createResponse = await createUser(user);

    if (user) {
      res.status(201).send({ message: "Folder created", data: createResponse });
    } else {
      res.status(500).send("Failed to create user.");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Update user details
router.patch("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const userPart = req.body;
    if (!userPart) return res.status(400).send("Bad Request.");

    if (id !== userId) return res.status(401).json({ message: "Unauthorized" });

    const updateResponse = await updateUser(toObjectId(id), userPart);
    if (updateResponse) {
      res.status(200).send("User updated");
    } else {
      res.status(500).send("Failed to update user.");
    }
  } catch (error) {
    console.log("Error updating snippet", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Delete user By Id
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const { id } = req.params;
  if (id !== userId) return res.status(401).json({ message: "Unauthorized" });
  const deleteResponse = await deleteUser(toObjectId(id));
  if (deleteResponse) {
    res.status(200).send("User Deleted");
  } else {
    res.status(500).send("Failed to delete user.");
  }
});

export default router;
