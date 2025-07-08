import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ChangeLogItem from "../ChangeLogItem";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/appStore";
import showToast from "../common/Toast";
import { Plus } from "lucide-react";

function ChangeLogsTab() {
  // Keeping loading true till I get actual data flowing
  const { loadedChangeLogs, setLoadedChangeLogs, setNewChangeLogDialog } =
    useAppStore();
  const [isLoading, setLoading] = useState<boolean>(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const getChangeLogs = async () => {
    try {
      setLoading(true);
      // console.log(`${backendURL}/api/changelogs`);
      // const response = await fetch(`${backendURL}/api/changelogs`);
      const response = await fetch(`${backendURL}/api/changelogs`);

      if (response.ok) {
        const result = await response.json();
        if (result) {
          setLoadedChangeLogs(result);
        } else {
          console.log("Error fetching changelogs");
          showToast({ msg: "Error fetching changelogs", type: "error" });
        }
      }
    } catch (error) {
      console.log("Error fetching changelogs", error);
      showToast({ msg: "Error fetching changelogs", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loadedChangeLogs.length == 0) {
      getChangeLogs();
    }
  }, [loadedChangeLogs]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Snippet Manager</h2>
        <Badge variant="outline">Version 1.1</Badge>
        <Badge
          variant="outline"
          className="cursor-pointer hover:bg-white/10"
          onClick={() => {
            console.log("***");
            setNewChangeLogDialog(true);
          }}
        >
          <Plus /> log
        </Badge>
      </div>

      <Separator />
      <ScrollArea className="h-full">
        <div>
          <h3 className="text-lg font-medium mb-2">🛠 Fixes</h3>
          {isLoading ? (
            <p className="text-muted-foreground italic">No Items found</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {loadedChangeLogs
                .filter((log) => log.category == "fix")
                .map((log) => (
                  <ChangeLogItem
                    key={log._id}
                    _id={log._id}
                    title={log.title}
                    description={log.description}
                    category={log.category}
                    status={log.status}
                    timestamp={log.timestamp}
                    author={log.author}
                    itemType={log.itemType}
                  />
                ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium my-2">🐞 Known Issues</h3>
          {isLoading ? (
            <p className="text-muted-foreground italic">No Items found</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {loadedChangeLogs
                .filter((log) => log.category == "known")
                .map((log) => (
                  <ChangeLogItem
                    key={log._id}
                    _id={log._id}
                    title={log.title}
                    description={log.description}
                    category={log.category}
                    status={log.status}
                    timestamp={log.timestamp}
                    author={log.author}
                    itemType={log.itemType}
                  />
                ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium my-2">
            🚀 Planned Features (v1.0)
          </h3>
          {isLoading ? (
            <p className="text-muted-foreground italic">No Items found</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {loadedChangeLogs
                .filter((log) => log.category == "planned")
                .map((log) => (
                  <ChangeLogItem
                    key={log._id}
                    _id={log._id}
                    title={log.title}
                    description={log.description}
                    category={log.category}
                    status={log.status}
                    timestamp={log.timestamp}
                    author={log.author}
                    itemType={log.itemType}
                  />
                ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium my-2">
            🤯 Planned Features (v2 & Beyond)
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {loadedChangeLogs
              .filter((log) => log.category == "v2-beyond")
              .map((log) => (
                <ChangeLogItem
                  key={log._id}
                  _id={log._id}
                  title={log.title}
                  description={log.description}
                  category={log.category}
                  status={log.status}
                  timestamp={log.timestamp}
                  author={log.author}
                  itemType={log.itemType}
                />
              ))}
          </ul>
        </div>
      </ScrollArea>
    </div>
  );
}

export default ChangeLogsTab;
