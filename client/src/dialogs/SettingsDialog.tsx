import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils"; // optional: to handle conditional classNames
import { useEffect, useState } from "react";
import ShortcutsTab from "../components/tabs/ShortcutsTab";
import AccountTab from "../components/tabs/AccountTab";
import PreferencesTab from "../components/tabs/PreferencesTab";
import { useAppStore } from "@/store/appStore";
import ChangeLogsTab from "../components/tabs/ChangeLogsTab";
import WhatsNewTab from "../components/tabs/WhatsNewTab";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const settingOptions = [
  { key: "account", label: "Account" },
  { key: "preferences", label: "Preferences" },
  { key: "shortcuts", label: "Shortcuts" },
  { key: "changelogs", label: "ChangeLogs" },
  { key: "whats-new", label: "What's new" },
];

function SettingsDialog() {
  const { showSettingsDialog, setSettingsDialog, currentSettingsTab } =
    useAppStore();

  const breakpoint = useBreakpoint();

  const [activeTab, setActiveTab] = useState(currentSettingsTab || "account");

  useEffect(() => {
    setActiveTab(currentSettingsTab);
  }, [currentSettingsTab]);

  return (
    <Dialog open={showSettingsDialog} onOpenChange={setSettingsDialog}>
      <DialogContent className="p-0 sm:w-fit">
        <DialogTitle className="flex items-center justify-between px-6 pt-3">
          <span>Settings</span>
        </DialogTitle>
        {breakpoint && breakpoint < 600 ? (
          <ScrollArea className="max-h-[500px] overflow-auto p-2">
            <Tabs defaultValue="account" className="">
              <TabsList className="flex h-fit flex-wrap gap-2 p-2">
                <TabsTrigger className="px-1.5 py-0.5" value="account">
                  Account
                </TabsTrigger>
                <TabsTrigger className="px-1.5 py-0.5" value="preferences">
                  Preferences
                </TabsTrigger>
                <TabsTrigger className="px-1.5 py-0.5" value="shortcuts">
                  Shortcuts
                </TabsTrigger>
                <TabsTrigger className="px-1.5 py-0.5" value="changelogs">
                  ChangeLogs
                </TabsTrigger>
                <TabsTrigger className="px-1.5 py-0.5" value="whats-new">
                  What's new
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <AccountTab />
              </TabsContent>
              <TabsContent value="preferences">
                <PreferencesTab />
              </TabsContent>
              <TabsContent value="shortcuts">
                <ShortcutsTab />
              </TabsContent>
              <TabsContent value="changelogs">
                <ChangeLogsTab />
              </TabsContent>
              <TabsContent value="whats-new">
                <WhatsNewTab />
              </TabsContent>
            </Tabs>
          </ScrollArea>
        ) : (
          <div className="sm: flex h-[400px] w-full max-w-[600px] sm:min-w-[500px]">
            <div className="border-r">
              <div className="flex flex-col pl-3">
                {settingOptions.map((item) => (
                  <div
                    key={item.key}
                    className={cn(
                      "cursor-pointer rounded-md rounded-r-none px-3 py-2 text-left transition hover:bg-white/5",
                      activeTab === item.key && "bg-white/5 font-medium",
                    )}
                    onClick={() => setActiveTab(item.key)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: content */}
            <div className="grow overflow-y-auto bg-white/5">
              {activeTab === "account" && <AccountTab />}
              {activeTab === "preferences" && <PreferencesTab />}
              {activeTab === "shortcuts" && <ShortcutsTab />}
              {activeTab === "changelogs" && <ChangeLogsTab />}
              {activeTab === "whats-new" && <WhatsNewTab />}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
