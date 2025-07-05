import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAlert from "@/providers/AlertProvider";
import type { SnippetType } from "@/types/snippetType";
import { useAuth } from "@clerk/clerk-react";
import { Dot, MoreVertical, Plus, Trash, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { allowedLanguages, capitalize, isLanguage } from "@/lib/utils";
import { CustomDropDown } from "./common/customDropDown";
import { useAppStore } from "@/store/appStore";

type SnippetTitleBarArgs = {
  snippet: SnippetType;
  isUpdated: boolean;
  handleUpdate: <K extends keyof SnippetType>(
    property: K,
    value: SnippetType[K]
  ) => void;
};
export default function SnippetTitleBar({
  snippet,
  isUpdated,
  handleUpdate,
}: SnippetTitleBarArgs) {
  const tagsInput = useRef<HTMLInputElement>(null);
  const [addingNewTags, setAddingNewTags] = useState<boolean>(false);
  const [tagInpVal, setTagInpVal] = useState<string>("");
  const { showAlertWithPromise } = useAlert();
  const { getToken } = useAuth();
  const [language, setLanguage] = useState(snippet.language);
  const [folder, setFolder] = useState(snippet.folderName || "Index");
  const { currentSnippet, loadedFolders, setLoadedSnippets, loadedSnippets } =
    useAppStore();

  const deleteSnippet = async () => {
    try {
      const token = await getToken();

      const options = {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`/api/snippets/${snippet._id}`, options);

      if (response.ok) {
        toast.success("Snippet deleted");
      } else {
        toast.error("Error deleting snippet, Try again.");
      }
    } catch (error) {
      console.log("Error deleting snippet, Try again", error);
      toast.error("Error deleting snippet, Try again.");
    }
  };

  const handleDelete = async () => {
    const response = await showAlertWithPromise({
      alertTitle: `Delete '${snippet.title}' file ?`,
      description: "This action cannot be undone",
      truthyButton: "Delete",
    });

    if (response) {
      deleteSnippet();
      setLoadedSnippets(loadedSnippets.filter((s) => s._id != snippet._id));
    }
  };

  const handleTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handleUpdate("tags", [tagInpVal]);
    handleUpdate("tags", [...snippet.tags, tagInpVal]);
    setTagInpVal("");
  };
  // tags: [...currentSnippet.tags, ...(value as string[])];
  // console.log("snippet =>", snippet);
  const handleTagClick = (value: string) => {};

  const handleTagRemove = async (value: string) => {
    const response = await showAlertWithPromise({
      alertTitle: `Remove '${value}' tag ?`,
      description: "This will unlink current snippet from this tag",
      truthyButton: "Remove",
    });

    if (response) {
      const updatedTags = snippet.tags.filter((tag) => tag != value);
      handleUpdate("tags", updatedTags);
    }
  };

  const handleLanguageUpdate = (value: string) => {
    if (isLanguage(language) && isLanguage(value)) {
      setLanguage(value);
      handleUpdate("language", language === value ? language : value);
    }
  };

  const handleFolderChange = (value: string) => {
    handleUpdate("folderName", value);
    if (value != "Index") {
      handleUpdate(
        "folderId",
        loadedFolders.find((folder) => folder.name == value)?._id
      );
    } else {
      handleUpdate("folderId", "remove");
    }
    setFolder(value);
  };

  const languageOptions = useMemo(() => {
    return allowedLanguages.map((language) => ({
      label: capitalize(language),
      value: language,
    }));
  }, [allowedLanguages]);

  const folderOptions = useMemo(() => {
    return [
      { label: "Index", value: "index", id: "" },
      ...loadedFolders.map((folder) => ({
        label: capitalize(folder.name),
        value: folder.name,
        id: folder._id,
      })),
    ];
  }, [loadedFolders]);

  useEffect(() => {
    setLanguage(currentSnippet.language);
    setFolder(currentSnippet.folderName);
  }, [currentSnippet]);

  return (
    <div className="flex items-center justify-between w-full px-4 py-2  bg-background text-sm overflow-hidden">
      <div className="grow flex items-end gap-2">
        <span className="font-medium truncate text-2xl">{snippet.title}</span>

        <div className="ml-6 flex flex-col gap-1">
          <span className="text-xs text-gray-400">Language</span>
          <CustomDropDown
            items={languageOptions}
            selected={language}
            title="language"
            onSelected={handleLanguageUpdate}
            variant="xs"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-400">Folder</span>
          <CustomDropDown
            items={folderOptions}
            selected={folder}
            title="folder"
            onSelected={handleFolderChange}
            variant="xs"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-400">Status</span>
          <Badge
            variant="outline"
            className={`mr-auto flex items-center gap-2 border-2 ${
              isUpdated
                ? "bg-amber-600/5 text-orange-300 border-orange-800/20"
                : "bg-green-600/5 text-green-700 border-green-800/20"
            }`}
          >
            {isUpdated && (
              <span className="block size-3 rounded-full bg-orange-300"></span>
            )}
            <span>{isUpdated ? "Unsaved" : "Saved"}</span>
          </Badge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-400">Tags</span>
          {snippet.tags && (
            <div className="grow flex flex-row items-center gap-1 flex-wrap">
              {snippet.tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs font-normal pl-2 py-0.5 h-6 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    handleTagClick(tag);
                  }}
                >
                  <span>{tag}</span>
                  <span
                    className="ml-2 size-3.5 p-0.5 bg-black/40   dark:bg-white/20 text-white rounded-full flex justify-center items-center"
                    onClick={() => {
                      handleTagRemove(tag);
                    }}
                  >
                    <X size={12} />
                  </span>
                </Badge>
              ))}

              <form
                onSubmit={handleTagSubmit}
                className={`  ${addingNewTags ? "block" : "hidden"}`}
              >
                <Input
                  ref={tagsInput}
                  type="text"
                  autoFocus={true}
                  value={tagInpVal}
                  onBlur={() => {
                    setAddingNewTags(false);
                    setTagInpVal("");
                  }}
                  onChange={(e) => setTagInpVal(() => e.target.value)}
                  placeholder="Add tag here"
                  className="max-w-[200px] p-0 h-6 pl-2"
                />
              </form>

              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  setAddingNewTags(true);
                  tagsInput.current?.focus();
                }}
              >
                <Plus /> Add tag
              </Badge>
            </div>
          )}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="p-1.5 rounded-md hover:bg-muted">
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            className="text-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
