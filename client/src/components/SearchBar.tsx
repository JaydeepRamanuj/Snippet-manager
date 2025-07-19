import { Input } from "@/components/ui/input";
import { Command } from "lucide-react";
import { Search } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import { useAppStore } from "@/store/appStore";

export default function SearchBar({ onFocus }: { onFocus?: () => void }) {
  const { open } = useSidebar();
  const { setSearchDialog } = useAppStore();
  return (
    <>
      {open ? (
        <div
          className="relative ml-auto max-w-[70%] grow"
          onClick={() => {
            setSearchDialog(true);
          }}
        >
          <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />

          <Input
            type="search"
            placeholder="Search snippets..."
            onFocus={onFocus}
            className="h-9 pr-20 pl-10 text-sm"
          />

          <div className="text-muted-foreground pointer-events-none absolute top-1.5 right-3 hidden items-center gap-1 rounded border px-1.5 py-0.5 text-xs sm:flex">
            Ctrl + k
          </div>
        </div>
      ) : (
        <Button size="icon" variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
