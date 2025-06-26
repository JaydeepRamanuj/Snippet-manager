import { Input } from "@/components/ui/input";
import { Command } from "lucide-react";
import { Search } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";

export default function SearchBar({ onFocus }: { onFocus?: () => void }) {
  const { open } = useSidebar();
  return (
    <>
      {open ? (
        <div className="grow relative ml-auto max-w-[70%]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

          <Input
            type="search"
            placeholder="Search snippets..."
            onFocus={onFocus}
            className="pl-10 pr-20 h-9 text-sm"
          />

          <div className="pointer-events-none absolute right-3 top-1.5 hidden sm:flex items-center gap-1 text-xs text-muted-foreground border rounded px-1.5 py-0.5">
            <Command className="h-3 w-3" />K
          </div>
        </div>
      ) : (
        <Button size="icon" variant="outline">
          <Search className=" h-4 w-4" />
        </Button>
      )}
    </>
  );
}
