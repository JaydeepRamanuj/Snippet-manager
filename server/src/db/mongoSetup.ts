import {
  Collection,
  Db,
  Document,
  MongoClient,
  ServerApiVersion,
} from "mongodb";

require("dotenv").config();

const uri: string | undefined = process.env.MONGO_DB_ATLAS_URI;
const databaseName: string | undefined = process.env.MONGO_DATABASE_NAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// These variables will help us export client and db instances,
// so we can use them other files

let _client: MongoClient | null;
let _db: Db | null;

export async function connectToDatabase() {
  if (_db) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (!uri) {
    console.log("Problem in connection URI, please verify");
    return;
  }
  if (!databaseName) {
    console.log("Missing Database Name");
    return;
  }

  try {
    // creating mongoDBClient
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    // connecting to database and passing that instance to _client
    _client = await client.connect();

    // Accessing database and passing that instance to _db
    _db = client.db(databaseName);
    console.log("MongoDB is connected.");
  } catch (error) {
    console.log("Error establishing connection to mongoDB", Error);
  }
}

export function getClient() {
  if (!_client) {
    throw new Error("Client not found, try reconnecting to database");
  }

  return _client;
}
export function getDb() {
  console.log("Calling getDb function");

  if (!_db) {
    throw new Error("Database not found, try reconnecting to database");
  }

  return _db;
}

// This function is generic as its need to access and return collection requested
// TSchema alone can't  satisfy it so we need to extend it with MongoDB's Document type

export function getCollection<TSchema extends Document>(
  collectionName: string
): Collection<TSchema> {
  if (!_db) {
    throw new Error("Database not found, try reconnecting to database");
  }

  const collection = _db.collection<TSchema>(collectionName);
  return collection;
}

export async function closeConnectionToDatabase() {
  if (_client) {
    await _client.close();
    _client = null;
    _db = null;
  } else {
    console.log("Please connect to database first");
  }
}
