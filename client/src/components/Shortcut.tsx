import { useHotkey } from "@/hooks/useHotKeys";

export function Shortcuts() {
  //   const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  //   useHotkey("Ctrl+b", toggleSidebar); // example: toggle sidebar
  useHotkey("Ctrl+s", () => console.log("Save snippet"));

  return null;
}
