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

export interface Snippet {
  id: string;
  authorId: string;
  title: string;
  language: Language;
  tags: string[];
  code: string; // Monaco string (could be JSON if needed)
  note: string; // HTML or Quill/TipTap output
  createdAt: Date;
  lastUpdated: Date;
}
