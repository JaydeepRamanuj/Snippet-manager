import { ScrollArea } from "../ui/scroll-area";

function ShortcutsTab() {
  const shortcuts = [
    { name: "Open Search", keys: "Ctrl + p" },
    { name: "Save Snippet", keys: "Ctrl + s" },
    { name: "Create New Snippet", keys: "Alt + n" },
    { name: "Create New Folder", keys: "Alt + m" },
    { name: "Toggle Theme", keys: "Ctrl + Shift + L" },
    { name: "Open Settings", keys: "Ctrl + ," },
    { name: "Toggle Sidebar", keys: "Ctrl + b" },
    // { name: "Search Tags", keys: "Ctrl + T" },
    // { name: "Delete Snippet", keys: "Del" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
      <ScrollArea className="flex flex-col overflow-auto ">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.name}
            className="flex justify-between items-center p-1 rounded-md border bg-muted mt-2"
          >
            <span className="text-sm">{shortcut.name}</span>
            <kbd className="text-xs bg-background border px-2 py-1 rounded font-mono">
              {shortcut.keys}
            </kbd>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default ShortcutsTab;
