"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function InputTags({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
}) {
  const [value, setValue] = useState("");

  const addTag = () => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setValue("");
  };

  return (
    <div className="flex flex-wrap gap-1 border rounded px-2 py-1 mt-2">
      {tags.map((tag, i) => (
        <Badge key={i} variant="outline" className="flex items-center">
          {tag}
          <X
            className="ml-1 h-3 w-3 cursor-pointer"
            onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
          />
        </Badge>
      ))}
      <Input
        className="border-none p-0 h-6 w-auto flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Add tag..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          }
        }}
        onBlur={addTag}
      />
    </div>
  );
}
