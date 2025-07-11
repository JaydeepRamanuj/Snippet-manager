import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils"; // optional: to handle conditional classNames
import { useEffect, useState } from "react";
import ShortcutsTab from "./tabs/ShortcutsTab";
import AccountTab from "./tabs/AccountTab";
import PreferencesTab from "./tabs/PreferencesTab";
import { useAppStore } from "@/store/appStore";
import ChangeLogsTab from "./tabs/ChangeLogsTab";
import WhatsNewTab from "./tabs/WhatsNewTab";

const settingOptions = [
  { key: "account", label: "Account" },
  { key: "preferences", label: "Preferences" },
  { key: "shortcuts", label: "Shortcuts" },
  { key: "changelogs", label: "ChangeLogs" },
  { key: "whats-new", label: "What's new" },
];

export function SettingsDialog() {
  const { showSettingsDialog, setSettingsDialog, currentSettingsTab } =
    useAppStore();

  const [activeTab, setActiveTab] = useState(currentSettingsTab || "account");

  useEffect(() => {
    setActiveTab(currentSettingsTab);
  }, [currentSettingsTab]);

  return (
    <Dialog open={showSettingsDialog} onOpenChange={setSettingsDialog}>
      <DialogContent className="w-fit p-0">
        <DialogTitle className="flex items-center justify-between px-6 pt-3">
          <span>Settings</span>
        </DialogTitle>
        <div className="flex h-[400px] min-w-[500px] max-w-[600px]">
          <div className="border-r">
            <div className="flex flex-col pl-3">
              {settingOptions.map((item) => (
                <div
                  key={item.key}
                  className={cn(
                    "text-left px-3 py-2 rounded-md rounded-r-none hover:bg-white/5 transition cursor-pointer",
                    activeTab === item.key && "bg-white/5 font-medium"
                  )}
                  onClick={() => setActiveTab(item.key)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right column: content */}
          <div className="grow overflow-y-auto bg-white/5 p-3">
            {activeTab === "account" && <AccountTab />}
            {activeTab === "preferences" && <PreferencesTab />}
            {activeTab === "shortcuts" && <ShortcutsTab />}
            {activeTab === "changelogs" && <ChangeLogsTab />}
            {activeTab === "whats-new" && <WhatsNewTab />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
