"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/appStore";

export function NewFolderDialog({
  onCreate,
}: {
  onCreate: (folderName: string) => void;
}) {
  const { showNewFolderDialog, setNewFolderDialog } = useAppStore();
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (!folderName.trim()) {
      setError("Folder name is required.");
      return;
    }

    onCreate(folderName.trim());
    setFolderName("");
    setError("");
    setNewFolderDialog(false);
  };
  return (
    <Dialog open={showNewFolderDialog} onOpenChange={setNewFolderDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-1">
            <Label htmlFor="folderName ">Folder Name</Label>
            <Input
              id="folderName"
              placeholder="e.g. utils, hooks, api"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              autoFocus
              required
              className="mt-2"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button onClick={handleCreate}>Create</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
