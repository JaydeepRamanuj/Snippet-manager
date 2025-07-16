import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useHotkey } from "@/hooks/useHotKeys";
import { useAppStore } from "@/store/appStore";
import { Folder } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function CommandMenu() {
  const {
    showSearchDialog,
    setSearchDialog,
    loadedSnippets,
    recentSnippets,
    setCurrentSnippet,
    addToRecentSnippets,
  } = useAppStore();

  useHotkey("Ctrl+p", () => {
    setSearchDialog(true);
  });
  useHotkey("Ctrl+k", () => {
    setSearchDialog(true);
  });

  const [recentItems, setRecentItems] = useState<
    {
      id: string;
      name: string;
      folderName: string | undefined;
    }[]
  >([]);

  const [inpVal, setInpVal] = useState("");
  // If user search something then show result else show recent snippets
  // For first time show 10 snippets
  const items = useMemo(() => {
    const snippets = inpVal
      ? loadedSnippets.filter((snippet) =>
          snippet.title.toLowerCase().includes(inpVal.toLowerCase()),
        )
      : recentSnippets.length > 0
        ? loadedSnippets.filter((s) => recentSnippets.includes(s._id))
        : loadedSnippets.slice(0, 10);

    return snippets.map((snippet) => ({
      id: snippet._id,
      name: snippet.title,
      folderName: snippet.folderName,
    }));
  }, [inpVal, loadedSnippets, recentSnippets]);

  useEffect(() => {
    setRecentItems(items);
  }, [items]);

  const handleClick = (value: string) => {
    // console.log("value =>", value);
    const selectedSnippet = loadedSnippets.find(
      (snippet) => snippet._id === value,
    );
    if (selectedSnippet) {
      setCurrentSnippet(selectedSnippet);
      addToRecentSnippets(selectedSnippet._id);
    }
    setInpVal("");
    setSearchDialog(false);
  };

  return (
    <CommandDialog open={showSearchDialog} onOpenChange={setSearchDialog}>
      <CommandInput
        placeholder="Search snippet..."
        value={inpVal}
        onValueChange={(value) => {
          setInpVal(value);
        }}
      />
      <CommandList>
        {recentItems.length == 0 && (
          <CommandEmpty>No snippets found</CommandEmpty>
        )}
        <CommandGroup
          forceMount
          heading={`${
            inpVal.length > 0
              ? "Search Result"
              : recentSnippets.length > 0
                ? "Recent snippets"
                : "More snippets"
          } `}
        >
          {recentItems &&
            recentItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  handleClick(item.id);
                }}
              >
                <div className="flex w-full items-center justify-between">
                  <span>{item.name}</span>
                  <span className="ml-3 flex items-center gap-2 text-xs text-gray-400">
                    <Folder /> {item.folderName}
                  </span>
                </div>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
