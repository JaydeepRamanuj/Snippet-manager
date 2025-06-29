import { Collection, ObjectId } from "mongodb";
import { getCollection, getDb } from "../db/mongoSetup";
import { FolderType } from "../types/functionType";

export async function createFolder(
  folder: Omit<FolderType, "_id">
): Promise<ObjectId | false> {
  try {
    const folderCollection: Collection<FolderType> = getCollection("folders");
    const response = await folderCollection.insertOne(folder as FolderType);
    if (response) {
      return response.insertedId;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error creating folder", error);
    return false;
  }
}
export async function getFolderDetail(
  id: ObjectId,
  userId: string
): Promise<FolderType | null | false> {
  try {
    const folderCollection: Collection<FolderType> = getCollection("folders");
    const folder = await folderCollection.findOne({ _id: id, userId: userId });
    if (folder) {
      return folder;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error accessing folder", error);
    return false;
  }
}
export async function updateFolder(
  id: ObjectId,
  userId: string,
  folder: Partial<FolderType>
) {
  try {
    const folderCollection: Collection<FolderType> = getCollection("folders");
    const response = await folderCollection.updateOne(
      { _id: id, userId: userId },
      { $set: folder }
    );
    if (response) {
      return response.acknowledged;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error updating folder details", error);
    return false;
  }
}
export async function deleteFolder(
  id: ObjectId,
  userId: string
): Promise<boolean> {
  try {
    const folderCollection: Collection<FolderType> = getCollection("folders");
    const response = await folderCollection.deleteOne({
      _id: id,
      userId: userId,
    });
    if (response) {
      return response.acknowledged;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error deleting folder", error);
    return false;
  }
}
