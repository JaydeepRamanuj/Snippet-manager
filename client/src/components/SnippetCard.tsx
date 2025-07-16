import { useAppStore } from "@/store/appStore";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Folder } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { useBreakpoint } from "@/hooks/useBreakpoint";

function SnippetCard({
  title,
  tags,
  language,
  folderName,
  _id,
  lastUpdateOn,
}: {
  _id: string;
  title: string;
  tags?: string[];
  language: string;
  folderName?: string;
  lastUpdateOn: string;
}) {
  const {
    loadedSnippets,
    setCurrentSnippet,
    currentSnippet,
    addToRecentSnippets,
  } = useAppStore();

  const { setOpenMobile } = useSidebar();
  const breakpoint = useBreakpoint();
  const handleClick = () => {
    if (loadedSnippets) {
      if (currentSnippet._id === _id) return;
      const newCurrentSnippet = loadedSnippets.find(
        (snippet) => snippet._id === _id,
      );
      if (newCurrentSnippet) {
        setCurrentSnippet(newCurrentSnippet);
        addToRecentSnippets(newCurrentSnippet._id);
        breakpoint && breakpoint < 600 && setOpenMobile(false);
      }
    }
  };

  return (
    <Card
      className={`mb-2 w-full cursor-pointer rounded-lg border border-gray-400/30 px-3 py-2 ${
        currentSnippet._id === _id
          ? "bg-blue-50 dark:bg-white/10"
          : "hover:bg-black/5 dark:hover:bg-white/5"
      }`}
      onClick={handleClick}
    >
      <CardContent className="flex flex-col gap-2 p-0">
        <h3 className="flex flex-wrap justify-between gap-2">
          <span>{title}</span>
          <span className="text-xs text-gray-500/60 dark:text-gray-300/60">
            {language}
          </span>
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {tags &&
            tags.map((tag, i) => (
              <Badge
                key={i}
                variant={"outline"}
                className="hover:bg-black/5 dark:hover:bg-white/10"
              >
                {tag}
              </Badge>
            ))}
        </div>
        <div className="flex flex-wrap justify-between gap-2 text-xs text-gray-500/60 dark:text-gray-300/60">
          {folderName && (
            <span className="flex items-center gap-2">
              <Folder size={12} />
              <span>{folderName}</span>
            </span>
          )}
          <span>{lastUpdateOn}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default SnippetCard;
