I was getting a type error

```bash
  The last overload gave the following error.
    Argument of type '(req: WithAuthProp<Request>, res: Response) => Promise<express.Response<any, Record<string, any>> | undefined>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: WithAuthProp<Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>>, res: Response<any, Record<string, any>>) => Promise<...>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.ts(2769)
```

on my snippetRoute.ts file (work in progress)

```js
import express, { Request, Response } from "express";
import { getSnippets } from "../services/snippetServices";
import { getAuth } from "@clerk/express";
import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { getUserId } from "./authHelper";

const router = express.Router();

// Get all snippets for authenticated user
router.get("/", async (req: Request, res: Response) => {
  try {
    // Getting userId from clerk
    const { userId } = getAuth(req);

    // Use Clerk's JavaScript Backend SDK to get the user's User object
    // const user = await clerkClient.users.getUser(userId)

    if (!userId) {
      return res.status(401).send("Unauthorized: User ID not found.");
    }

    const snippets = await getSnippets({
      type: "all",
      userId: userId,
    });
    if (snippets) {
      res.status(200).json(snippets);
    } else {
      res.status(500).send("Failed to fetch snippets.");
    }
  } catch (error) {
    console.error("Error getting snippets:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Get specific snippet by Id for authenticated user
router.get("/snippet/:id");
// Create snippet for authenticated user
router.post("/snippet/:id");
// Update snippet details for authenticated user
router.patch("/snippet/:id");
// Delete snippet By Id for authenticated user
router.delete("/snippet/:id");

export default router;
```

Tried adding `WithAuthProp<Request>` to avoid that error but turns out TypeScript is mistakenly try to pass it to `Application`. Turns out this is known issue.

To avoid it, I have downgraded express types to 4.17.21, using `npm install --save-dev @types/express@4.17.21`

Note: I'm still learning TS so I don't know what goes inside but I think this is learning process

Reference: <https://chatgpt.com/share/68609c17-39bc-8007-a8fc-6ff30350a321>
