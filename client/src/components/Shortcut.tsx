import { useHotkey } from "@/hooks/useHotKeys";
import { useAppStore } from "@/store/appStore";
import { useTheme } from "@/providers/themeProvider";

export function Shortcuts() {
  // const { setNewFolderDialog, setNewFileDialog } = useAppStore();
  //   const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  //   useHotkey("Ctrl+b", toggleSidebar); // example: toggle sidebar
  // useHotkey("Ctrl+s", () => console.log("Save snippet"));
  // useHotkey("Ctrl+Shift+n", () => setNewFileDialog(true));
  // useHotkey("Ctrl+s", () => console.log("Save snippet"));

  const { theme, setTheme } = useTheme();
  const { setSettingsDialog } = useAppStore();

  useHotkey("Ctrl+Shift+l", () => {
    console.log("Inside theme change shortcut");
    if (theme == "dark") {
      setTheme("light");
    }
    if (theme == "light") {
      setTheme("dark");
    }
  });
  useHotkey("Ctrl+,", () => {
    console.log("Inside setting dialog shortcut");
    setSettingsDialog(true);
  });

  return null;
}
