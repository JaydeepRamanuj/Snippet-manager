import { ObjectId } from "mongodb";

export function convertToMongoDBObjectId(id: string) {
  return new ObjectId(id);
}
