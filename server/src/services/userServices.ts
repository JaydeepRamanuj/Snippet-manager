import { Collection, DeleteResult, ObjectId } from "mongodb";
import { getCollection, getDb } from "../db/mongoSetup";
import { UserType } from "../types/userType";

export async function createUser(
  user: Omit<UserType, "_id">
): Promise<ObjectId | false> {
  try {
    const userCollection: Collection<UserType> = getCollection("snippets");

    const response = await userCollection.insertOne(user as UserType);
    if (response) {
      return response.insertedId;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error creating user", error);
    return false;
  }
}
export async function getUserDetail(
  id: ObjectId
): Promise<UserType | null | false> {
  try {
    const userCollection: Collection<UserType> = getCollection("snippets");

    const user = await userCollection.findOne({ _id: id });
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error accessing user", error);
    return false;
  }
}
export async function updateUser(id: ObjectId, user: Partial<UserType>) {
  try {
    const userCollection: Collection<UserType> = getCollection("snippets");

    const response = await userCollection.updateOne(
      { _id: id },
      { $set: user }
    );
    if (response) {
      return response.acknowledged;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error updating user details", error);
    return false;
  }
}
export async function deleteUser(id: ObjectId): Promise<boolean> {
  try {
    const userCollection: Collection<UserType> = getCollection("snippets");

    const response = await userCollection.deleteOne({ _id: id });
    if (response) {
      return response.acknowledged;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error deleting user", error);
    return false;
  }
}
