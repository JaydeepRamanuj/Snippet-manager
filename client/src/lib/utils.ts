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

export function isLanguage(value: string): value is Language {
  return allowedLanguages.includes(value as Language);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
