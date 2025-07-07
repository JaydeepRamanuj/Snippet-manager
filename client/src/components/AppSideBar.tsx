import { Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { ThemeModeToggle } from "./ThemeModeToggle";
import FolderCard from "./FolderCard";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import SearchBar from "./SearchBar";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useAppStore } from "@/store/appStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import type { SnippetType } from "@/types/snippetType";
import type { FolderType } from "@/types/folderType";
import SnippetCard from "./SnippetCard";
import UserDropdown from "./UserDropDown";
import { useHotkey } from "@/hooks/useHotKeys";
import showToast from "./common/Toast";

export function AppSidebar() {
  const {
    setNewFileDialog,
    setNewFolderDialog,
    setSideBarWidth,
    setAuthDialog,
  } = useAppStore();
  const { open } = useSidebar();
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [isSnippetsLoading, setIsSnippetsLoading] = useState(false);
  const [isFoldersLoading, setIsFoldersLoading] = useState(false);
  const [isCalculatingSideBarWidth, setIsCalculatingSideBarWidth] =
    useState(true);

  const invisibleDivToFindSideBarWidth = useRef<HTMLDivElement>(null);
  const handleAddNewFolder = () => setNewFolderDialog(true);
  const handleAddNewFile = () => setNewFileDialog(true);

  const { getToken, isLoaded } = useAuth();
  const { user } = useUser();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const {
    loadedSnippets,
    setLoadedSnippets,
    loadedFolders,
    setLoadedFolders,
    currentFolder,
  } = useAppStore();
  // console.log("user.id =>", user?.id);

  const getSnippets = async () => {
    setIsSnippetsLoading(true);
    const token = await getToken();
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      setIsSnippetsLoading(true);
      const response = await fetch(`${backendURL}/api/snippets`, options);

      if (response.ok) {
        const result = await response.json();
        // console.log("result =>", result);
        setSnippets(result);
        setLoadedSnippets(result);
        setIsSnippetsLoading(false);
      }
    } catch (error) {
      console.log("Error getting snippets", error);
      setIsSnippetsLoading(false);
    }
  };

  const getFolders = async () => {
    const token = await getToken();
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      setIsFoldersLoading(true);
      const response = await fetch(`${backendURL}/api/folders`, options);

      if (response.ok) {
        const result = await response.json();
        // console.log("result =>", result);
        setFolders([...loadedFolders, ...result]);
        setLoadedFolders([...loadedFolders, ...result]);
      }
      setIsFoldersLoading(false);
    } catch (error) {
      console.log("Error getting folders", error);
      setIsFoldersLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && loadedSnippets.length == 0) {
      getSnippets();
    }

    if (isLoaded && loadedFolders.length == 1) {
      getFolders();
    }

    setFolders(loadedFolders);
  }, [user?.id, loadedFolders]);

  const currentFolderSnippets = useMemo(() => {
    return currentFolder == "index"
      ? loadedSnippets
      : loadedSnippets.filter((snippet) => snippet.folderId == currentFolder);
  }, [currentFolder, loadedSnippets]);

  // Registering shortcuts
  useHotkey("Alt+n", () => {
    if (!user?.id) {
      showToast({ msg: "Please login to add new Snippets.", type: "info" });
      setAuthDialog(true);
      return;
    }
    setNewFileDialog(true);
  });
  useHotkey("Alt+m", () => {
    if (!user?.id) {
      showToast({ msg: "Please login to add new folder.", type: "info" });
      setAuthDialog(true);
      return;
    }
    setNewFolderDialog(true);
  });

  // useHotkey("Ctrl+s", () => console.log("Save snippet"));

  useEffect(() => {
    setSnippets(currentFolderSnippets);
    // setFolders(loadedFolders);
  }, [currentFolder, loadedFolders, loadedSnippets]);

  // This will find sidebar width from snippets's `invisibleDivToFindSideBarWidth` container

  // I will keep showing loader until sideBarWidth is not set

  useEffect(() => {
    if (!isCalculatingSideBarWidth) return;
    setIsCalculatingSideBarWidth(true);

    if (!invisibleDivToFindSideBarWidth.current) return;

    const widths = Array.from(
      invisibleDivToFindSideBarWidth.current.children
    ).map((child) => (child as HTMLElement).offsetWidth);

    const maxWidth = Math.max(...widths, 500);

    setSideBarWidth(maxWidth + 16);

    setIsSnippetsLoading(false);
    setIsCalculatingSideBarWidth(false);
  }, [, isCalculatingSideBarWidth, snippets]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className={`${open && "p-1.5"}`}>
        <SidebarGroup>
          <SidebarGroupContent className="flex items-center flex-wrap justify-between">
            <SidebarTrigger />
            <ThemeModeToggle />
            <SearchBar />
          </SidebarGroupContent>
        </SidebarGroup>
        {open && (
          <div className="">
            <Separator />
            <div className="flex">
              <SidebarGroup className={`w-fit pr-0 min-w-[150px]`}>
                <SidebarGroupLabel className="flex justify-between items-center pr-3">
                  <span>Folders</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Plus
                        className="dark:text-gray-500 dark:hover:text-white/80 text-black/40 hover:text-black/80 cursor-pointer"
                        size={18}
                        onClick={handleAddNewFolder}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add new folder</p>
                    </TooltipContent>
                  </Tooltip>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <ScrollArea className="flex flex-col max-h-[80vh] overflow-auto pr-3">
                    {isFoldersLoading ? (
                      <div className="flex flex-col items-center py-10 gap-4">
                        <div className="size-6 border-2 rounded-full border-t-transparent border-white animate-spin"></div>
                        <span>Loading Folders</span>
                      </div>
                    ) : (
                      folders.map((folder) => (
                        <FolderCard
                          key={folder._id}
                          id={folder._id}
                          name={folder.name}
                        />
                      ))
                    )}
                  </ScrollArea>
                </SidebarGroupContent>
              </SidebarGroup>

              <Separator orientation="vertical" className="h-full" />

              <SidebarGroup className="grow pr-1">
                <SidebarGroupLabel className="flex justify-between items-center pr-4">
                  <span>Files</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Plus
                        className="dark:text-gray-500 dark:hover:text-white/80 text-black/40 hover:text-black/80 cursor-pointer"
                        size={18}
                        onClick={handleAddNewFile}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add new File</p>
                    </TooltipContent>
                  </Tooltip>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <ScrollArea className="grow flex flex-col max-h-[80vh] overflow-auto pr-4">
                    {isSnippetsLoading ? (
                      <div className="flex flex-col items-center py-10 gap-4">
                        <div className="size-6 border-2 rounded-full border-t-transparent border-white animate-spin"></div>
                        <span>Loading Snippets</span>
                      </div>
                    ) : isCalculatingSideBarWidth ? (
                      <div
                        ref={invisibleDivToFindSideBarWidth}
                        className="invisible absolute top-0 left-0"
                      >
                        {snippets.map((snippet) => (
                          <SnippetCard
                            key={snippet._id}
                            _id={snippet._id}
                            title={snippet.title}
                            language={snippet.language}
                            lastUpdateOn={snippet.createdAt}
                            tags={snippet.tags}
                            folderName={snippet.folderName}
                          />
                        ))}
                      </div>
                    ) : snippets.length == 0 ? (
                      <div className="text-gray-500 text-center py-6">
                        No snippets found
                      </div>
                    ) : (
                      snippets.map((snippet) => (
                        <SnippetCard
                          key={String(snippet._id)}
                          _id={snippet._id}
                          title={snippet.title}
                          language={snippet.language}
                          lastUpdateOn={snippet.lastUpdatedOn}
                          tags={snippet.tags}
                          folderName={snippet.folderName}
                        />
                      ))
                    )}
                  </ScrollArea>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
            <Separator />
          </div>
        )}
        <SidebarFooter className="mt-auto ml-auto">
          <UserDropdown />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
