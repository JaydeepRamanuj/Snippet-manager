export type Category = "fix" | "known" | "planned" | "v2-beyond";
export type Status = "pending" | "in-process" | "completed";
export type ItemType =
  | "UI"
  | "UX"
  | "Logic"
  | "Performance"
  | "Feature"
  | "Backend"
  | "Security";

export type ChangeLogType = {
  _id: string;
  title: string;
  description?: string;
  category?: Category;
  status?: Status;
  timestamp?: string;
  author?: string;
  itemType?: ItemType;
};
