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
import { Dot, MoreVertical, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

export default function FileTitleBar({ snippet }: { snippet: SnippetType }) {
  const { showAlertWithPromise } = useAlert();

  const { getToken } = useAuth();

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
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-1  bg-background text-sm overflow-hidden">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="flex flex-col justify-center">
          <span className="font-medium truncate ">{snippet.title}</span>
          <span className="text-muted-foreground text-xs truncate flex items-center gap-3">
            {snippet.folderName} {snippet.folderName && <Dot />}
            {snippet.language}
          </span>
        </div>

        {snippet.tags && (
          <div className="flex items-center gap-1 flex-wrap max-w-[300px]">
            {snippet.tags.map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-xs font-normal px-2 py-0.5 h-5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
            <Badge variant="secondary" className="cursor-pointer">
              <Plus /> Add tag
            </Badge>
          </div>
        )}
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
