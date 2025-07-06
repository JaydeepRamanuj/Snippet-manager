import { ObjectId } from "mongodb";

export function toObjectId(id: string) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId");
  return new ObjectId(id);
}
