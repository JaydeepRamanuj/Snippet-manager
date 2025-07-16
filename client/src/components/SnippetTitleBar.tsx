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
import { Edit, MoreVertical, Plus, Trash, X } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { allowedLanguages, capitalize, isLanguage } from "@/lib/utils";
import { CustomDropDown } from "./common/customDropDown";
import { useAppStore } from "@/store/appStore";
import showToast from "./common/Toast";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { SidebarTrigger } from "./ui/sidebar";

type SnippetTitleBarArgs = {
  snippet: SnippetType;
  isUpdated: boolean;
  handleUpdate: <K extends keyof SnippetType>(
    property: K,
    value: SnippetType[K],
  ) => void;
  saveSnippet: () => void;
};
export default function SnippetTitleBar({
  snippet,
  isUpdated,
  handleUpdate,
  saveSnippet,
}: SnippetTitleBarArgs) {
  const tagsInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const [addingNewTags, setAddingNewTags] = useState<boolean>(false);
  const [tagInpVal, setTagInpVal] = useState<string>("");
  const [titleInpVal, setTitleInpVal] = useState<string>(snippet.title);
  const { showAlertWithPromise } = useAlert();
  const { getToken } = useAuth();
  const [language, setLanguage] = useState(snippet.language);
  const [folder, setFolder] = useState(snippet.folderName ?? "Index");
  const [isRenaming, setRenaming] = useState<boolean>(false);
  const { currentSnippet, loadedFolders, setLoadedSnippets, loadedSnippets } =
    useAppStore();
  const [isSaveBadgeHover, setSaveBadgeHover] = useState<boolean>(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const breakpoint = useBreakpoint();

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

      const response = await fetch(
        `${backendURL}/api/snippets/${snippet._id}`,
        options,
      );

      if (response.ok) {
        showToast({ msg: "Snippet deleted", type: "success" });
      } else {
        showToast({ msg: "Error deleting snippet, try again.", type: "error" });
      }
    } catch (error) {
      console.log("Error deleting snippet, Try again", error);
      showToast({ msg: "Error deleting snippet, try again.", type: "error" });
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

  const handleTagClick = (value: string) => {
    console.log(value);
  };

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
  };

  const handleTitleRenaming = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInpVal) return;
    handleUpdate("title", titleInpVal);
    setRenaming(false);
  };

  const languageOptions = useMemo(() => {
    return allowedLanguages.map((language) => ({
      label: capitalize(language),
      value: language,
    }));
  }, [allowedLanguages]);

  const folderOptions = useMemo(() => {
    return [
      // { label: "Index", value: "index", id: "" },
      ...loadedFolders.map((folder) => ({
        label: capitalize(folder.name),
        value: folder.name,
        id: folder._id,
      })),
    ];
  }, [loadedFolders]);

  // console.log(folderOptions);
  useEffect(() => {
    setLanguage(currentSnippet.language);
    setFolder(currentSnippet.folderName);
  }, [currentSnippet]);

  // wrapping inside timeout so ref can access element and apply focus
  useEffect(() => {
    setTimeout(() => {
      if (isRenaming && titleInput.current) {
        titleInput.current.focus();
        titleInput.current?.select();
      }
    }, 50);
  }, [isRenaming]);

  return (
    <div className="bg-background flex w-full items-center justify-between overflow-hidden px-4 py-2 text-sm">
      <div className="flex size-min grow items-center gap-2 sm:items-end">
        {breakpoint && breakpoint < 600 && <SidebarTrigger />}
        {isRenaming ? (
          <form onSubmit={handleTitleRenaming}>
            <Input
              ref={titleInput}
              type="text"
              value={titleInpVal}
              onChange={(e) => setTitleInpVal(e.target.value)}
            />
          </form>
        ) : (
          <span
            className="truncate text-xl font-medium sm:text-2xl"
            onDoubleClick={() => {
              setRenaming(true);
              titleInput.current?.focus();
              titleInput.current?.select();
            }}
          >
            {snippet.title}
          </span>
        )}

        {breakpoint && breakpoint > 600 && (
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
        )}
        {breakpoint && breakpoint > 600 && (
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
        )}
        <div className="flex flex-col gap-1">
          {breakpoint && breakpoint > 600 && (
            <span className="text-xs text-gray-400">Status</span>
          )}
          <Badge
            variant="outline"
            className={`mr-auto flex cursor-pointer items-center gap-2 border-2 ${
              isUpdated
                ? "border-orange-800/20 bg-amber-600/5 text-orange-300"
                : "border-green-800/20 bg-green-600/5 text-green-700"
            }`}
            onMouseEnter={() => setSaveBadgeHover(true)}
            onMouseLeave={() => setSaveBadgeHover(false)}
            onClick={() => {
              saveSnippet();
            }}
          >
            {isUpdated && (
              <span className="block size-3 rounded-full bg-orange-300"></span>
            )}
            <span>
              {isUpdated && isSaveBadgeHover
                ? "Click to save"
                : breakpoint && breakpoint < 600 && isUpdated
                  ? "Unsaved. Click to save"
                  : isUpdated
                    ? "Unsaved"
                    : "Saved"}
            </span>
          </Badge>
        </div>
        {breakpoint && breakpoint > 600 && (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Tags</span>
            {snippet.tags && (
              <div className="flex grow flex-row flex-wrap items-center gap-1">
                {snippet.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="flex h-6 cursor-pointer items-center justify-between py-0.5 pl-2 text-xs font-normal hover:bg-black/5 dark:hover:bg-white/10"
                    onClick={() => {
                      handleTagClick(tag);
                    }}
                  >
                    <span>{tag}</span>
                    <span
                      className="ml-2 flex size-3.5 items-center justify-center rounded-full bg-black/40 p-0.5 text-white dark:bg-white/20"
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
                  className={`${addingNewTags ? "block" : "hidden"}`}
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
                    className="h-6 max-w-[200px] p-0 pl-2"
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
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-muted rounded-md p-1.5">
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-2.5 p-2">
          {breakpoint && breakpoint < 600 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-400">Language</span>
              <CustomDropDown
                items={languageOptions}
                selected={language}
                title="language"
                onSelected={handleLanguageUpdate}
                variant="xs"
              />
            </div>
          )}
          {breakpoint && breakpoint < 600 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-400">Folder</span>
              <CustomDropDown
                items={folderOptions}
                selected={folder}
                title="folder"
                onSelected={handleFolderChange}
                variant="xs"
              />
            </div>
          )}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setRenaming(true);
              titleInput.current?.focus();
              titleInput.current?.select();
            }}
          >
            <Edit />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
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
