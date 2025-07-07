import { Badge } from "@/components/ui/badge";

type ChangeLogItemProps = {
  title: string;
  description?: string;
  category: "fix" | "known" | "planned";
  status: "pending" | "in-process" | "completed";
  timestamp?: string;
  author?: string;
  itemType: "UI" | "UX" | "Logic" | "Performance" | "Feature";
};

export default function ChangeLogItem({
  title,
  description,
  status,
  timestamp,
  author = "JD",
  itemType,
}: ChangeLogItemProps) {
  return (
    <div className="rounded-xl border bg-background p-2 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-bold">{title}</h3>
        <div className="flex items-center gap-2">
          <span
            className={`${
              status == "completed"
                ? "text-green-300/60"
                : status == "in-process"
                ? "text-gray-500"
                : "text-orange-400/60"
            }`}
          >
            {status === "in-process" && "In Process"}
            {status === "completed" && "Completed"}
            {status === "pending" && "Pending"}
          </span>
          <Badge variant="outline">{itemType}</Badge>
        </div>
      </div>

      {description && (
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      )}

      <div className="text-xs text-muted-foreground flex justify-between pt-2 border-t">
        <span>🛠 by {author}</span>
        {timestamp && <span>🕒 {timestamp}</span>}
      </div>
    </div>
  );
}
