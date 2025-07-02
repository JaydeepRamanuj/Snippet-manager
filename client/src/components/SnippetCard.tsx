import { useAppStore } from "@/store/appStore";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { useAuth } from "@clerk/clerk-react";

function SnippetCard({
  title,
  tags,
  language,
  folderName,
  _id,
  createdAt,
}: {
  _id: string;
  title: string;
  tags?: string[];
  language: string;
  folderName?: string;
  createdAt: string;
}) {
  const { getToken } = useAuth();
  const { loadedSnippets, setCurrentSnippet } = useAppStore();
  const getSnippet = async () => {
    const token = await getToken();
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`/api/snippets/${_id}`, options);

      if (response.ok) {
        const result = await response.json();
        console.log("result =>", result);
        result && setCurrentSnippet(result);
      }
    } catch (error) {
      console.log("Error getting snippets", error);
    }
  };

  const handleClick = () => {
    if (loadedSnippets) {
      setCurrentSnippet(_id);
    } else {
      // Call this if no snippet data is available
      getSnippet();
    }
  };

  return (
    <Card
      className="w-full border border-gray-400/30 rounded-lg  dark:hover:bg-white/5 hover:bg-black/5 py-2 px-3 cursor-pointer mb-2"
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
          <span>{folderName && folderName}</span>
          <span>{createdAt}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default SnippetCard;
