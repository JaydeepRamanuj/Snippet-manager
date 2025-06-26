import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

function FileCard({
  title,
  tags,
  language,
  parentFolder,
  id,
  createdOn,
}: {
  title: string;
  tags: string[];
  language: string;
  parentFolder: string;
  id: number;
  createdOn: string;
}) {
  return (
    <Card className="border border-gray-400/30 rounded-lg  dark:hover:bg-white/5 hover:bg-black/5 py-2 px-3 cursor-pointer mb-2">
      <CardContent className="p-0 flex flex-col gap-2 ">
        <h3 className="flex justify-between">
          <span>{title}</span>
          <span>{language}</span>
        </h3>
        <div className="flex items-center gap-3">
          {tags.map((tag) => (
            <Badge
              variant={"outline"}
              className="dark:hover:bg-white/10 hover:bg-black/5"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between text-xs dark:text-gray-300/60">
          <span>{parentFolder}</span>
          <span>{createdOn}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default FileCard;
