import { Folder, FolderOpen } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useEffect, useRef, useState } from "react";
import useAlert from "@/providers/AlertProvider";
import { useAppStore } from "@/store/appStore";

function FolderCard({ id, name }: { id: string; name: string }) {
  const { open } = useSidebar();
  const [inpVal, setInpVal] = useState(name);
  const [renaming, setRenaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentFolder, setCurrentFolder } = useAppStore();

  const { showAlertWithPromise } = useAlert();
  useEffect(() => {
    setTimeout(() => {
      if (renaming && inputRef.current) {
        inputRef.current.focus();
        inputRef.current?.select();
      }
    }, 0);
  }, [renaming]);

  const handleDelete = async () => {
    const response = await showAlertWithPromise({
      alertTitle: `Delete ${name} folder ?`,
      description: "This action cannot be undone",
      truthyButton: "Delete",
    });

    console.log(response);
  };

  const handleClick = () => {
    setCurrentFolder(id);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          {open ? (
            <Card
              className={` p-0 rounded-md cursor-pointer   mb-2 group relative 
                ${
                  currentFolder === id
                    ? "text-blue-600 bg-blue-50 dark:text-white  dark:bg-white/10"
                    : "dark:hover:bg-white/5 hover:bg-black/5 dark:text-gray-300 dark:hover:text-gray-100"
                }`}
              onClick={handleClick}
            >
              <CardContent className="p-1.5 px-2 flex items-center justify-start gap-2">
                {!renaming && currentFolder === id ? (
                  <FolderOpen size={16} />
                ) : (
                  <Folder size={16} />
                )}
                {!renaming && <span>{name}</span>}
                {renaming && (
                  <form onSubmit={() => setRenaming(false)}>
                    <input
                      ref={inputRef}
                      type="text"
                      name=""
                      id=""
                      className="w-[70%]"
                      value={inpVal}
                      onChange={(e) => {
                        setInpVal(e.target.value);
                      }}
                    />
                  </form>
                )}
              </CardContent>
            </Card>
          ) : (
            <Button size="icon" variant="outline">
              {currentFolder === id ? (
                <FolderOpen size={16} />
              ) : (
                <Folder size={16} />
              )}
            </Button>
          )}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setRenaming(true)}>
            Rename
          </ContextMenuItem>
          <ContextMenuItem className="text-red-300" onClick={handleDelete}>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}

export default FolderCard;
