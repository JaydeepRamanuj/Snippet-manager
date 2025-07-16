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
import { useAuth } from "@clerk/clerk-react";
import showToast from "./common/Toast";

function FolderCard({ id, name }: { id: string; name: string }) {
  const { open } = useSidebar();
  const [inpVal, setInpVal] = useState(name);
  const [renaming, setRenaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentFolder, setCurrentFolder, loadedFolders, setLoadedFolders } =
    useAppStore();
  const { getToken } = useAuth();

  const backendURL = import.meta.env.VITE_BACKEND_URL;
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

    if (response) {
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
          `${backendURL}/api/folders/${id}`,
          options,
        );

        if (response.ok) {
          showToast({ msg: "Folder deleted", type: "success" });

          setLoadedFolders(loadedFolders.filter((folder) => folder._id !== id));
        } else {
          showToast({
            msg: "Error deleting folder, Try again.",
            type: "error",
          });
        }
      } catch (error) {
        console.log("Error deleting folder, Try again", error);
        showToast({
          msg: "Error deleting folder, Try again.",
          type: "error",
        });
      }
    }
  };

  const handleClick = () => {
    setCurrentFolder(id);
  };

  const handleFolderRenaming = () => {
    setRenaming(false);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          {open ? (
            <Card
              className={`group relative mb-2 cursor-pointer rounded-md p-0 ${
                currentFolder === id
                  ? "bg-blue-50 text-blue-600 dark:bg-white/10 dark:text-white"
                  : "hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-100"
              }`}
              onClick={handleClick}
            >
              <CardContent className="flex items-center justify-start gap-2 p-1.5 px-2">
                {!renaming && currentFolder === id ? (
                  <FolderOpen size={16} />
                ) : (
                  <Folder size={16} />
                )}
                {!renaming && <span>{name}</span>}
                {renaming && (
                  <form onSubmit={handleFolderRenaming}>
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
