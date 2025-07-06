import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputTags } from "./InputTags";
import { useAppStore } from "@/store/appStore";
import { useAuth, useUser } from "@clerk/clerk-react";
import type { SnippetType } from "@/types/snippetType";
import {
  allowedLanguages,
  capitalize,
  formatDateToIndianStyle,
  isLanguage,
} from "@/lib/utils";
import { toast } from "sonner";
import { CustomDropDown } from "./common/customDropDown";
import showToast from "./common/Toast";

export function NewSnippetDialog() {
  const { showNewFileDialog, setNewFileDialog, loadedFolders } = useAppStore();
  const [title, setTitle] = useState("");
  const [folder, setFolder] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");

  const { getToken } = useAuth();
  const { user } = useUser();

  const { setCurrentSnippet, loadedSnippets, setLoadedSnippets } =
    useAppStore();
  const createNewSnippet = async () => {
    const token = await getToken();

    if (!user?.id) {
      showToast({ msg: "Please login to add new Snippets.", type: "info" });
      return;
    }

    const existingFolder = loadedFolders.find((f) => f.name === folder);

    console.log("existingFolder =>", existingFolder);
    console.log("folder =>", folder);
    const newSnippet: Omit<SnippetType, "_id"> = {
      createdAt: formatDateToIndianStyle(),
      language: isLanguage(language) ? language : "javascript",
      lastUpdatedOn: formatDateToIndianStyle(),
      title: title,
      ...(existingFolder &&
        folder != "Index" && { folderId: existingFolder._id }),
      folderName: folder || "Index",
      code: "// Namaste World 🙏",
      note: "Write your comments here...",
      tags: tags,
      userId: user?.id,
    };

    console.log("newSnippet =>", newSnippet);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSnippet),
      };

      const response = await fetch("/api/snippets/", options);

      if (response.ok) {
        response && showToast({ msg: "Snippet created", type: "success" });
        const result = await response.json();

        console.log("result =>", result);
        setCurrentSnippet({ _id: result.data, ...newSnippet });
        setLoadedSnippets([
          ...loadedSnippets,
          { ...newSnippet, _id: result.data },
        ]);
      }
    } catch (error) {
      console.log("Error creating snippet", error);
      showToast({ msg: "Error creating snippet", type: "error" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !language) {
      setError("Please fill all required fields.");
      return;
    }
    createNewSnippet();
    setTitle("");
    setFolder("");
    setLanguage("");
    setTags([]);
    setError("");
    setNewFileDialog(false);
  };

  const folderOptions = useMemo(() => {
    return loadedFolders.map((folder) => ({
      label: capitalize(folder.name),
      value: folder.name,
      id: folder._id,
    }));
  }, [loadedFolders]);

  const languageOptions = useMemo(() => {
    return allowedLanguages.map((language) => ({
      label: capitalize(language),
      value: language,
    }));
  }, [allowedLanguages]);

  useEffect(() => {
    return () => {
      setTitle("");
      setFolder("");
      setLanguage("");
      setTags([]);
      setError("");
    };
  }, [showNewFileDialog]);

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

          {/* <div>
            <Label htmlFor="parent">Parent Folder</Label>
            <Input
              id="parent"
              required
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              placeholder="e.g. hooks"
              className="mt-2"
            />
          </div> */}

          {/* <FolderDropDown
            value={folder}
            onUpdate={(value: string) => setFolder(value)}
          /> */}

          <div>
            <Label className="mb-3">Folder</Label>
            <CustomDropDown
              items={folderOptions}
              selected={folder}
              title="folder"
              onSelected={(value: string) => setFolder(value)}
            />
          </div>
          <div>
            <Label className="mb-3">Language</Label>
            <CustomDropDown
              items={languageOptions}
              selected={language}
              title="language"
              onSelected={(value: string) => setLanguage(value)}
            />
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
