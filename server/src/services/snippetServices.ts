import { Collection, InsertOneResult, ObjectId } from "mongodb";
import { getCollection, getDb } from "../db/mongoSetup";
import { SnippetType } from "../types/SnippetType";

export async function createSnippet(
  snippet: Omit<SnippetType, "_id">
): Promise<ObjectId | false> {
  console.log("Snippet create request");
  try {
    const snippetCollection: Collection<SnippetType> =
      getCollection("snippets");
    const response = await snippetCollection?.insertOne(snippet as SnippetType);
    if (response) {
      return response?.insertedId;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error creating new snippet", error);
    return false;
  }
}

export async function updateSnippet(
  id: ObjectId,
  userId: string,
  snippetPart: SnippetType
): Promise<boolean> {
  console.log("Snippet update request");
  try {
    const snippetCollection: Collection<SnippetType> =
      getCollection("snippets");

    // const { _id, ...fieldsToUpdate } = snippetPart;

    const response = await snippetCollection?.updateOne(
      { _id: id, userId: userId },
      { $set: snippetPart }
    );

    if (response.modifiedCount > 0) {
      return response.acknowledged;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error updating the snippet", error);
    return false;
  }
}

type getSnippetsType = {
  type: "folder" | "tag" | "all";
  folderId?: ObjectId;
  tags?: string[];
  fields?: string[];
  userId: string;
  limit?: number;
};

export async function getSnippets({
  type,
  folderId,
  tags,
  fields,
  userId,
  limit = 0,
}: getSnippetsType): Promise<SnippetType[] | false> {
  console.log("Snippet get request");
  try {
    const snippetCollection: Collection<SnippetType> =
      getCollection("snippets");

    let filter;

    if (type == "folder") {
      filter = { folderId: folderId, userId: userId };
    } else if (type == "tag") {
      filter = {
        userId: userId,
        tags: { $in: tags },
      };
    } else {
      filter = { userId: userId };
    }

    const projection = fields
      ? fields.reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>)
      : {
          _id: true,
          title: true,
          lastUpdatedOn: true,
          language: true,
          tags: true,
          folderId: true,
        };

    // We get findCursor type from 'find' method which can't be directly passed
    // So we have to convert it to array first
    const snippetsCursor = await snippetCollection
      ?.find(filter, projection)
      .limit(limit);

    if (snippetsCursor) {
      const snippetsArray = await snippetsCursor.toArray();
      return snippetsArray;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error getting snippets", error);
    return false;
  }
}

export async function getSingleSnippet(id: ObjectId, userId: string) {
  console.log("Snippet get request");
  try {
    const snippetCollection: Collection<SnippetType> =
      getCollection("snippets");

    const snippet = await snippetCollection?.findOne({
      _id: id,
      userId: userId,
    });
    if (snippet) {
      return snippet;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error deleting snippet", error);
    return false;
  }
}

export async function deleteSnippet(
  id: ObjectId,
  userId: string
): Promise<boolean> {
  console.log("Snippet delete request");
  try {
    const snippetCollection: Collection<SnippetType> =
      getCollection("snippets");

    const response = await snippetCollection?.deleteOne({
      _id: id,
      userId: userId,
    });
    if (response.deletedCount > 0) {
      return response.acknowledged;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error deleting snippet", error);
    return false;
  }
}
