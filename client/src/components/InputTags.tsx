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

  // Adding tag
  const addTag = () => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setValue("");
  };
  return (
    <div className="mt-2 flex flex-wrap gap-1 rounded border px-2 py-1">
      {tags.map((tag, i) => (
        <Badge key={i} variant="outline" className="flex items-center">
          {tag}
          <span className="flex size-4 items-center justify-center rounded-full bg-white/20">
            <X
              size={10}
              className="cursor-pointer text-white"
              onClick={() => {
                console.log("clicked");
                setTags(tags.filter((t) => t !== tag));
              }}
            />
          </span>
        </Badge>
      ))}
      <Input
        className="h-6 w-auto flex-1 rounded-xs border-none p-0 pl-2 focus-visible:ring-0 focus-visible:ring-offset-0"
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
