import { AuthObject } from "@clerk/express"; // adjust as needed

declare global {
  namespace Express {
    interface Request {
      auth?: AuthObject;
    }
  }
}
