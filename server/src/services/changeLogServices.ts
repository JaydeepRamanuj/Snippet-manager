import { Collection, ObjectId } from "mongodb";
import { Request, Response } from "express";
import { ChangeLogType } from "../types/changeLogType";
import { getCollection } from "../db/mongoSetup";

// create changelog
export async function createChangeLog(
  changelog: Omit<ChangeLogType, "_id">
): Promise<ObjectId | false> {
  try {
    console.log("Changelog create request");

    const changeLogCollection: Collection<ChangeLogType> =
      getCollection("changelogs");

    const createResponse = await changeLogCollection.insertOne(
      changelog as ChangeLogType
    );

    console.log("createResponse in Services =>", createResponse);
    if (createResponse) {
      return createResponse?.insertedId;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error creating changelog", error);
    return false;
  }
}

// get all changelogs
export async function getAllChangeLogs(): Promise<ChangeLogType[] | false> {
  console.log("Changelog get request");
  try {
    const changeLogCollection: Collection<ChangeLogType> =
      getCollection("changelogs");
    const changeLogCursor = await changeLogCollection.find();

    if (changeLogCursor) {
      const changeLogArray = await changeLogCursor.toArray();
      return changeLogArray;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error getting changelog", error);
    return false;
  }
}

export async function updateChangeLog(
  _id: ObjectId,
  changelogPart: Omit<ChangeLogType, "_id">
) {
  console.log("Changelog update request");
  try {
    const changeLogCollection: Collection<ChangeLogType> =
      getCollection("changelogs");

    const response = await changeLogCollection.updateOne(
      { _id: _id },
      { $set: changelogPart }
    );

    if (response.matchedCount > 0) {
      return response.acknowledged;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error updating the snippet", error);
    return false;
  }
}

// delete a changelog by id
export async function deleteChangeLog(_id: ObjectId): Promise<boolean> {
  console.log("Changelog delete request");
  try {
    const changeLogCollection: Collection<ChangeLogType> =
      getCollection("changelogs");
    const deleteResponse = await changeLogCollection.deleteOne({ _id: _id });
    if (deleteResponse.deletedCount > 0) {
      return deleteResponse.acknowledged;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error deleting changelog", error);
    return false;
  }
}
