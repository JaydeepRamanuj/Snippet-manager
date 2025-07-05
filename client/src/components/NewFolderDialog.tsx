"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/appStore";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import type { FolderType } from "@/types/folderType";

export function NewFolderDialog() {
  const { showNewFolderDialog, setNewFolderDialog } = useAppStore();
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState("");
  const { getToken } = useAuth();
  const { user } = useUser();

  const { loadedFolders, setLoadedFolders } = useAppStore();

  const createNewFolder = async () => {
    folderName.trim();
    const token = await getToken();

    if (!user?.id) {
      toast.warning("Please login to add new snippets.");
      return;
    }

    const newFolder: Omit<FolderType, "_id"> = {
      name: folderName,
      userId: user?.id,
    };
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFolder),
      };

      const response = await fetch("/api/folders/", options);

      if (response.ok) {
        const result = await response.json();
        result && toast.success("Folder created");

        // console.log("result =>", result);

        setLoadedFolders([
          ...loadedFolders,
          { ...newFolder, _id: result.data },
        ]);
      }
    } catch (error) {
      console.error("Error creating folder", error);
    }
  };

  const handleCreate = () => {
    if (!folderName.trim()) {
      setError("Folder name is required.");
      return;
    }
    createNewFolder();
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
