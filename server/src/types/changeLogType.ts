import { ObjectId } from "mongodb";

export type ChangeLogType = {
  _id: ObjectId;
  title: string;
  description?: string;
  category?: "fix" | "known" | "planned" | "v2-beyond";
  status?: "pending" | "in-process" | "completed";
  timestamp?: string;
  author?: string;
  itemType?:
    | "UI"
    | "UX"
    | "Logic"
    | "Performance"
    | "Feature"
    | "Backend"
    | "Security";
};
