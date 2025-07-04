"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { InputTags } from "./InputTags";
import { useAppStore } from "@/store/appStore";

export function NewFileDialog({ onCreate }: { onCreate: (data: any) => void }) {
  const { showNewFileDialog, setNewFileDialog } = useAppStore();
  const [title, setTitle] = useState("");
  const [parent, setParent] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !parent || !language) {
      setError("Please fill all required fields.");
      return;
    }
    onCreate({ title, parent, language, tags });
    setTitle("");
    setParent("");
    setLanguage("");
    setTags([]);
    setError("");
    setNewFileDialog(false);
  };

  return (
    <Dialog open={showNewFileDialog} onOpenChange={setNewFileDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. useDebounce.ts"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="parent">Parent Folder</Label>
            <Input
              id="parent"
              required
              value={parent}
              onChange={(e) => setParent(e.target.value)}
              placeholder="e.g. hooks"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="mt-2">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {["TypeScript", "JavaScript", "Python", "Go", "Rust"].map(
                  (lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tags</Label>
            <InputTags tags={tags} setTags={setTags} />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
