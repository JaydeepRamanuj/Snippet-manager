import { ObjectId } from "mongodb";

export type FolderType = {
  _id: ObjectId;
  name: string;
  parentId?: string;
  userId: string;
};
