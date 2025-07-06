import { useAppStore } from "@/store/appStore";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Folder } from "lucide-react";

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

  const handleClick = () => {
    if (loadedSnippets) {
      if (currentSnippet._id === _id) return;
      const newCurrentSnippet = loadedSnippets.find(
        (snippet) => snippet._id === _id
      );
      if (newCurrentSnippet) {
        setCurrentSnippet(newCurrentSnippet);
        addToRecentSnippets(newCurrentSnippet._id);
      }
    }
  };

  return (
    <Card
      className={`w-full border border-gray-400/30 rounded-lg py-2 px-3 cursor-pointer mb-2 ${
        currentSnippet._id === _id
          ? "bg-blue-50  dark:bg-white/10"
          : "hover:bg-black/5 dark:hover:bg-white/5"
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-0 flex flex-col gap-2 ">
        <h3 className="flex justify-between flex-wrap gap-2">
          <span>{title}</span>
          <span className="text-gray-500/60 text-xs dark:text-gray-300/60">
            {language}
          </span>
        </h3>
        <div className="flex items-center gap-3  flex-wrap">
          {tags &&
            tags.map((tag, i) => (
              <Badge
                key={i}
                variant={"outline"}
                className="dark:hover:bg-white/10 hover:bg-black/5"
              >
                {tag}
              </Badge>
            ))}
        </div>
        <div className="flex justify-between text-xs flex-wrap text-gray-500/60  dark:text-gray-300/60 gap-2">
          {folderName && (
            <span className="flex gap-2 items-center">
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
