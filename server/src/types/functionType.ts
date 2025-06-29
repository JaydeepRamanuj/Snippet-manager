import { ObjectId } from "mongodb";

export type FolderType = {
  _id: ObjectId;
  name: string;
  parentId: ObjectId;
  userId: string;
};
