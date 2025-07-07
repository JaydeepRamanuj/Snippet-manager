import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ChangeLogItem from "../ChangeLogItem";
import { ScrollArea } from "../ui/scroll-area";

function ChangeLogsTab() {
  // Keeping loading true till I get actual data flowing
  const loading = false;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Snippet Manager</h2>
        <Badge variant="outline">Version 1.0.0</Badge>
      </div>

      <Separator />
      <ScrollArea className="h-full">
        <div>
          <h3 className="text-lg font-medium mb-2">🛠 Fixes</h3>
          {loading ? (
            <p className="text-muted-foreground italic">No Items found</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <ChangeLogItem
                title="Search bar not working on page reload"
                description="Fixed issue where the search bar would break due to Zustand state reset on hard refresh."
                category="fix"
                status="completed"
                timestamp="7 July 2025"
                author="JD"
                itemType="Logic"
              />
              <ChangeLogItem
                title="Setting tab not reflecting option selected"
                description="Earlier, It was just opening dialogue but now there's state that store current tab and open tab accordingly "
                category="fix"
                status="completed"
                timestamp="7 July 2025"
                author="JD"
                itemType="UX"
              />
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium my-2">🐞 Known Issues</h3>
          {loading ? (
            <p className="text-muted-foreground italic">No Items found</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <ChangeLogItem
                title="Snippet (code) out of sync"
                description="Newly created Snippet is not loading correctly on code"
                category="known"
                status="pending"
                itemType="UX"
              />
              <ChangeLogItem
                title="Renaming snippet looses focus"
                description="When user clicks on 'Rename' and moves mouse rename input goes away"
                category="known"
                status="pending"
                itemType="UX"
              />
              <ChangeLogItem
                title="Unsaved label for unchanged content"
                description="When user changes anything it triggers zustand to make it unsaved which doesn't rollback when user comes back to original content"
                category="known"
                status="pending"
                itemType="UX"
              />
              <ChangeLogItem
                title="Theme toggle on note editor don't change code editor's theme"
                description="When user toggles theme using Note editors icon it isn't passing theme data to code"
                category="known"
                status="pending"
                itemType="UX"
              />
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium my-2">
            🚀 Planned Features (v1.0)
          </h3>
          {loading ? (
            <p className="text-muted-foreground italic">No Items found</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <ChangeLogItem
                title="Mobile responsiveness"
                description="Not optimized for mobile views yet. Planned for upcoming v2."
                category="planned"
                status="pending"
                itemType="UX"
              />
              <ChangeLogItem
                title="Google login"
                description="User will be able to sign in using Google and Github"
                category="planned"
                status="pending"
                itemType="Feature"
              />
              <ChangeLogItem
                title="Option to Reset Password"
                description="User will be able to reset password via OTP on email"
                category="planned"
                status="pending"
                itemType="Feature"
              />
              <ChangeLogItem
                title="Dynamic changeLogs"
                description="App will be able to load dynamic changeLogs via API"
                category="planned"
                status="pending"
                itemType="Feature"
              />
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium my-2">
            🤯 Planned Features (v2 & Beyond)
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <ChangeLogItem
              title="Option to Change keybinds"
              description="User will be able to change keybinds as per their likings "
              category="planned"
              status="pending"
              itemType="Feature"
            />
            <ChangeLogItem
              title="Option to search by Tags and Folders"
              description="User will be able to search and filter by tags/folder"
              category="planned"
              status="pending"
              itemType="Feature"
            />
            <ChangeLogItem
              title="Single snippet with multiple Codes and Notes"
              description="User will be able to save multiple codes and their notes in single snippet, eg. index.html, style.css"
              category="planned"
              status="pending"
              itemType="Feature"
            />
          </ul>
        </div>
      </ScrollArea>
    </div>
  );
}

export default ChangeLogsTab;
