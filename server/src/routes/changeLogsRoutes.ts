import express, { Request, Response } from "express";
import {
  createChangeLog,
  deleteChangeLog,
  getAllChangeLogs,
  updateChangeLog,
} from "../services/changeLogServices";
import { toObjectId } from "./routeHelper";

const router = express.Router();

// create changelog
router.get("/", async (req: Request, res: Response) => {
  try {
    const changeLogs = await getAllChangeLogs();
    if (changeLogs) {
      res.status(200).json(changeLogs);
    } else {
      res.status(404).send("ChangeLogs not found");
    }
  } catch (error) {
    console.error("Error getting changelog:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// get all changelogs
router.post("/", async (req: Request, res: Response) => {
  const changeLog = req.body;
  if (!changeLog) return res.status(400).send("Bad Request.");
  try {
    console.log("changeLog =>", changeLog);
    const createResponse = await createChangeLog(changeLog);
    console.log("createResponse =>", createResponse);
    if (createResponse) {
      res
        .status(201)
        .send({ message: "ChangeLog created", data: createResponse });
    } else {
      res.status(500).send("Failed to create changelog.");
    }
  } catch (error) {
    console.error("Error creating changelog:", error);
    res.status(500).send("Internal Server Error.");
  }
});

//  update changelog
router.put("/:id", async (req: Request, res: Response) => {
  const changeLogPart = req.body;
  const { id } = req.params;

  if (!changeLogPart || !id) return res.status(400).send("Bad Request.");

  try {
    const updateResponse = await updateChangeLog(toObjectId(id), changeLogPart);

    if (updateResponse) {
      res.status(201).send("ChangeLog updated");
    } else {
      res.status(500).send("Failed to update changelog.");
    }
  } catch (error) {
    console.error("Error updating changelog:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// delete a changelog by id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Bad Request.");

    const deleteResponse = await deleteChangeLog(toObjectId(id));

    if (deleteResponse) {
      res.send("Changelog Deleted");
    } else {
      return res.status(500).send("Failed to delete changelog");
    }
  } catch (error) {
    console.error("Error deleting changelog:", error);
    res.status(500).send("Internal Server Error.");
  }
});

export default router;
