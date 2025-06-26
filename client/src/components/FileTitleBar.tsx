import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus, Trash } from "lucide-react";

interface FileTitleBarProps {
  title: string;
  parentFolder: string;
  tags: string[];
  language: string;
  onDelete?: () => void;
}

export default function FileTitleBar({
  title,
  parentFolder,
  tags,
  language,
  onDelete,
}: FileTitleBarProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-1  bg-background text-sm overflow-hidden">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="flex flex-col justify-center">
          <span className="font-medium truncate ">{title}</span>
          <span className="text-muted-foreground text-xs truncate ">
            {parentFolder} &middot; {language}
          </span>
        </div>

        <div className="flex items-center gap-1 flex-wrap max-w-[300px]">
          {tags.map((tag, i) => (
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
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="p-1.5 rounded-md hover:bg-muted">
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            className="text-red-500 cursor-pointer"
            onClick={onDelete}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
