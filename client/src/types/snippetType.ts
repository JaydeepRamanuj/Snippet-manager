export type Language =
  | "javascript"
  | "typescript"
  | "html"
  | "css"
  | "python"
  | "cpp"
  | "java"
  | "go"
  | "json"
  | "bash"
  | "other";

export interface SnippetType {
  _id: string;
  userId: string;
  folderId?: string;
  title: string;
  language: Language;
  tags?: string[];
  code?: string; // Monaco outout
  note?: string; // TipTap output
  createdAt: string;
  lastUpdatedOn: string;
  folderName?: string;
}
