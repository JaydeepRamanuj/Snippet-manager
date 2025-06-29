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
import FileCard from "./FileCard";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropDowb";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useAppStore } from "@/store/appStore";
import { useEffect } from "react";

const folders = [
  { id: 1, title: "JavaScript", isOpen: false, fileCount: 2 },
  { id: 2, title: "TypeScript", isOpen: false, fileCount: 3 },
  { id: 3, title: "React", isOpen: false, fileCount: 8 },
  { id: 4, title: "Next.js", isOpen: false, fileCount: 4 },
  { id: 5, title: "Node.js", isOpen: false, fileCount: 3 },
  { id: 6, title: "CSS", isOpen: false, fileCount: 1 },
  { id: 7, title: "HTML", isOpen: false, fileCount: 1 },
];
const files = [
  {
    id: 1,
    title: "index.html",
    language: "js",
    tags: ["React", "Javascript"],
    parentFolder: "HTML",
    createdOn: "5/12/2023 12:06 PM",
  },
  {
    id: 2,
    title: "style.css",
    language: "css",
    tags: ["Styling"],
    parentFolder: "CSS",
    createdOn: "8/7/2022 2:27 PM",
  },
  {
    id: 3,
    title: "Input.jsx",
    language: "jsx",
    tags: ["JavaScript", "React"],
    parentFolder: "React",
    createdOn: "31/1/2024 4:02 PM",
  },
  {
    id: 4,
    title: "Button.tsx",
    language: "tsx",
    tags: ["React", "TypeScript"],
    parentFolder: "TypeScript",
    createdOn: "13/3/2023 6:29 AM",
  },
  {
    id: 5,
    title: "utils.ts",
    language: "ts",
    tags: ["React", "TypeScript"],
    parentFolder: "TypeScript",
    createdOn: "24/9/2022 11:38 AM",
  },
  {
    id: 1,
    title: "index.html",
    language: "js",
    tags: ["React", "Javascript"],
    parentFolder: "HTML",
    createdOn: "5/12/2023 12:06 PM",
  },
  {
    id: 2,
    title: "style.css",
    language: "css",
    tags: ["Styling"],
    parentFolder: "CSS",
    createdOn: "8/7/2022 2:27 PM",
  },
];

export function AppSidebar() {
  const { setNewFileDialog, setNewFolderDialog } = useAppStore();
  const { open } = useSidebar();
  const handleAddNewFolder = () => setNewFolderDialog(true);
  const handleAddNewFile = () => setNewFileDialog(true);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/api/snippets/");
      console.log("response =>", response);
    };

    getData();
  }, []);

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
                    {folders.map((folder) => (
                      <FolderCard
                        key={folder.id}
                        name={folder.title}
                        isOpen={folder.isOpen}
                      />
                    ))}
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
                    {files.map((file) => (
                      <FileCard
                        id={file.id}
                        title={file.title}
                        language={file.language}
                        createdOn={file.createdOn}
                        tags={file.tags}
                        parentFolder={file.parentFolder}
                      />
                    ))}
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
