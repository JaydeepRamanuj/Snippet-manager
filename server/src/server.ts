import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db/mongoSetup";
import { clerkMiddleware } from "@clerk/express";
import snippetsRouter from "./routes/snippetRoute";
import folderRouter from "./routes/folderRoute";
import userRouter from "./routes/userRoute";

const app = express();
const PORT = process.env.PORT || "3000";
const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// While in development, I'm keeping cors to accept all origins
// But in production I will add client's domain
app.use(
  cors({
    // client origin
    origin: origin,

    // // For clerk
    // credentials: true,
  })
);

// This clerk middleware will provide user'data and can be useful when we want to access userId or whole user Object
app.use(clerkMiddleware());

startServer();

// Modularizing routes
app.use("/api/snippets", snippetsRouter);
app.use("/api/folders", folderRouter);
app.use("/api/users", userRouter);

// Handling errors
app.use((err: any, res: express.Response) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

async function startServer() {
  // Making sure database is connected before server starts listening
  try {
    connectToDatabase();
    console.log("Attempting Connection to mongoDB server");
  } catch (error) {
    throw Error("Error while connecting to mongoDB server");
  }

  app.listen(PORT, () => {
    console.log("Server started.");
    console.log(`Server is listening on PORT : ${PORT}`);
  });
}
