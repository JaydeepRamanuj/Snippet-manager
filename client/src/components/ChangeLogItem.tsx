import { Badge } from "@/components/ui/badge";
import type { ChangeLogType } from "@/types/changeLogType";

export default function ChangeLogItem(log: ChangeLogType) {
  return (
    <div className="bg-background space-y-2 rounded-xl border p-2 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-bold">{log.title}</h3>
        <div className="flex items-center gap-2">
          <span
            className={`${
              log.status == "completed"
                ? "text-green-300/60"
                : log.status == "in-process"
                  ? "text-gray-500"
                  : "text-orange-400/60"
            }`}
          >
            {log.status === "in-process" && "In Process"}
            {log.status === "completed" && "Completed"}
            {log.status === "pending" && "Pending"}
          </span>
          <Badge variant="outline">{log.itemType}</Badge>
        </div>
      </div>

      {log.description && (
        <p className="text-muted-foreground mt-3 text-sm">{log.description}</p>
      )}

      <div className="text-muted-foreground flex justify-between border-t pt-2 text-xs">
        <span>🛠 by {log.author}</span>
        {log.timestamp && <span>🕒 {log.timestamp}</span>}
      </div>
    </div>
  );
}
