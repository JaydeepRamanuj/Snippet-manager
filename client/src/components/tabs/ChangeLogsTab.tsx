import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function ChangeLogsTab() {
  // Keeping loading true till I get actual data flowing
  const loading = true;

  return (
    <div className="space-y-3 p-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Snippet Manager</h2>
        <Badge variant="outline">Version 1.0.0</Badge>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-2">🛠 Fixes</h3>
        {loading ? (
          <p className="text-muted-foreground italic">Coming soon...</p>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Fix 1</li>
            <li>Fix 2</li>
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">🐞 Known Issues</h3>
        {loading ? (
          <p className="text-muted-foreground italic">Coming soon...</p>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Issue 1</li>
            <li>Issue 2</li>
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">🚀 Planned Features (v1.0)</h3>
        {loading ? (
          <p className="text-muted-foreground italic">Coming soon...</p>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Feature 1</li>
            <li>Feature 2</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default ChangeLogsTab;
