### requireAuth middlware

I want only authorized users to be able use he app, so I need to authorize user before attempting any operations.

I'm using clerk so it handles auth, both on client and server side. I get JWT token when user is signs in then I need to pass that token to each and every request I make to server

Here is an example option

```js
import { useAuth } from "@clerk/clerk-react";

// Accessing token from clerk on client side
const { getToken } = useAuth();
const token = await getToken();

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(newSnippet),

  const response = await fetch("/api/snippet", options);
};
```

Here note that I'm accessing token and passing it as `Authorization:`Bearer ${token}`, in header.

To access it no server side, I need to call getAuth method provided from clerk

```js
import { getAuth } from "@clerk/express";

const { userId } = getAuth(req);

if (!userId) {
  return res.status(401).send("Unauthorized: User ID not found.");
}
```

But I had to check it on each and every operations which is repetitive.

To solve it I have made a middleware named `requireAuth` which will check for authorization. If user is authorized it will let it move forward else it will reject it from there.

But we still need userId to verify, to do we are also injecting userId to request object. This way we can get userId directly from req.

Same logic but in middleware

```js

import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Attaching userId to request object so we can access it inside route methods
  (req as any).userId = userId;
  next();
}

```

Now to use this as middleware we can use it like,

```js
import { requireAuth } from "../middleware/requireAuth";

router.get("/snippets", requireAuth, async (req, res) => {

    //   We an now access it directly from req object
  const userId = (req as any).userId;
  const snippets = await getSnippets({ userId, type: "all" });
  res.json(snippets);
});

```
