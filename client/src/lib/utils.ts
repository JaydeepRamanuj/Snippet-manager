import type { Category, ItemType, Status } from "@/types/changeLogType";
import type { Language } from "@/types/snippetType";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToIndianStyle(date = new Date()) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

export const allowedLanguages: Language[] = [
  "javascript",
  "typescript",
  "html",
  "css",
  "python",
  "cpp",
  "java",
  "go",
  "json",
  "bash",
  "other",
];

export const categories: Category[] = ["fix", "known", "planned", "v2-beyond"];
export const status: Status[] = ["pending", "in-process", "completed"];
export const itemTypes: ItemType[] = [
  "UI",
  "UX",
  "Logic",
  "Performance",
  "Feature",
  "Backend",
  "Security",
];

export function isLanguage(value: string): value is Language {
  return allowedLanguages.includes(value as Language);
}
export function isStatus(value: string): value is Status {
  return status.includes(value as Status);
}
export function isCategory(value: string): value is Category {
  return categories.includes(value as Category);
}
export function isItemType(value: string): value is ItemType {
  return itemTypes.includes(value as ItemType);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
