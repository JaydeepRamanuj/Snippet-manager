import { ScrollArea } from "../ui/scroll-area";

function ShortcutsTab() {
  const shortcuts = [
    { name: "Open Search", keys: ["Ctrl + k", "Ctrl + p"] },
    { name: "Save Snippet", keys: ["Ctrl + s"] },
    { name: "Create New Snippet", keys: ["Alt + n"] },
    { name: "Create New Folder", keys: ["Alt + m"] },
    { name: "Toggle Theme", keys: ["Ctrl + Shift + L"] },
    { name: "Open Settings", keys: ["Ctrl + ,"] },
    { name: "Toggle Sidebar", keys: ["Ctrl + b"] },
    // { name: "Search Tags", keys: "Ctrl + T" },
    // { name: "Delete Snippet", keys: "Del" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
      <ScrollArea className="flex flex-col overflow-auto">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.name}
            className="bg-muted item-start mt-2 flex flex-col justify-between rounded-md border p-1 md:flex-row md:items-center"
          >
            <span className="text-sm">{shortcut.name}</span>
            <div className="mt-2 md:mt-0 md:ml-auto md:space-x-2">
              {shortcut.keys.map((key) => (
                <kbd
                  key={key}
                  className="bg-background/40 rounded-md border px-2 py-1 font-mono text-xs font-semibold"
                >
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default ShortcutsTab;
