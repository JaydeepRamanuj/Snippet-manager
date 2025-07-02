import { Collection, ObjectId } from "mongodb";
import { getCollection, getDb } from "../db/mongoSetup";
import { FolderType } from "../types/folderType";

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

type GetFolderDetailsArgs = {
  type: "all" | "specific";
  userId: string;
  id?: ObjectId;
};

export async function getFolderDetails({
  type,
  userId,
  id,
}: GetFolderDetailsArgs): Promise<FolderType | null | false> {
  try {
    const folderCollection: Collection<FolderType> = getCollection("folders");
    const folders = await folderCollection.findOne(
      type == "specific" ? { _id: id, userId: userId } : { userId: userId }
    );
    if (folders) {
      return folders;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error accessing folder", error);
    return false;
  }
}

type UpdateFolderArgs = {
  id: ObjectId;
  userId: string;
  folder: Partial<FolderType>;
};
export async function updateFolder({ id, userId, folder }: UpdateFolderArgs) {
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

type DeleteFolderArgs = {
  id: ObjectId;
  userId: string;
};
export async function deleteFolder({
  id,
  userId,
}: DeleteFolderArgs): Promise<boolean> {
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
