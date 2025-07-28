import { Button } from "@/components/ui/button";
import { useHotkey } from "@/hooks/useHotKeys";
import { useAppStore } from "@/store/appStore";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Code, Folder, Info, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import type { SnippetType } from "@/types/snippetType";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
function SearchDialog() {
  const {
    showSearchDialog,
    setSearchDialog,
    loadedSnippets,
    recentSnippets,
    setCurrentSnippet,
    addToRecentSnippets,
    tagsList,
    foldersList,
    languageList,
  } = useAppStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const suggestionItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resultItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [inpVal, setInpVal] = useState("");
  const [suggestionType, setSuggestionType] = useState<
    "tags" | "folder" | "language" | null
  >(null);
  type FilterType = {
    tags: string[];
    folder: string;
    language: string;
  };
  const [filters, setFilters] = useState<FilterType>({
    tags: [],
    folder: "",
    language: "",
  });

  const [suggestionItems, setSuggestionItems] = useState<string[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [currentSuggestionItem, setCurrentItem] = useState(0);
  const [selectedSnippet, setSelectedSnippet] = useState(0);
  const [suggestionMenuPos, setSuggestionMenuPos] = useState({
    top: 0,
    left: 0,
  });

  useHotkey("Ctrl+p", () => setSearchDialog(true));
  useHotkey("Ctrl+k", () => setSearchDialog(true));

  // console.log("recentSnippets =>", recentSnippets);

  const items = useMemo(() => {
    let snippets: SnippetType[] = [];

    // If there is no filter and no Input value then show recent items
    if (
      inpVal == "" &&
      filters.tags.length == 0 &&
      filters.folder == "" &&
      filters.language == ""
    ) {
      if (recentSnippets.length > 0) {
        snippets = loadedSnippets.filter((s) => recentSnippets.includes(s._id));
      } else {
        snippets = loadedSnippets.slice(0, 10);
      }
    }
    // If there is Input value but no filters present then filter from loaded snippet and show result
    else if (
      inpVal != "" &&
      filters.tags.length == 0 &&
      filters.folder == "" &&
      filters.language == ""
    ) {
      snippets = loadedSnippets.filter((snippet) =>
        snippet.title.toLowerCase().includes(inpVal.toLowerCase()),
      );
    }

    // If both Input value and filters are present then filter according to provided filters and input value
    else {
      let filteredSnippets: SnippetType[] = loadedSnippets;

      // filtering based on language
      filteredSnippets = filters.language
        ? filteredSnippets.filter(
            (snippet) => snippet.language == filters.language,
          )
        : filteredSnippets;

      // filtering based on folder
      filteredSnippets = filters.folder
        ? filteredSnippets.filter(
            (snippet) => snippet.folderName == filters.folder,
          )
        : filteredSnippets;

      // filtering based on language
      // Here I'm only selecting snippet if it has mentioned tags mentioned in filter tags
      filteredSnippets =
        filters.tags.length != 0
          ? filteredSnippets.filter((snippet) =>
              // Every will check if mentioned tags are present or not
              snippet.tags.some((tag) => filters.tags.includes(tag)),
            )
          : filteredSnippets;

      snippets = filteredSnippets;
    }

    return snippets.map((snippet) => ({
      id: snippet._id,
      name: snippet.title,
      folderName: snippet.folderName,
    }));
  }, [inpVal, loadedSnippets, recentSnippets, filters]);

  // Handle keyBoard events like ArrowUp, ArrowDown, Enter and Escape for both suggestion Items and Input
  const handleSuggestionNavigation = (e: React.KeyboardEvent) => {
    if (showSuggestion) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        // This will ensure we stay inside items and goes up when pressed down on last item
        const next = (currentSuggestionItem + 1) % suggestionItems.length;
        setCurrentItem(next);
        suggestionItemRefs.current[next]?.focus();
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        // This will ensure we stay inside items and goes down when pressed up on first item
        const prev =
          (currentSuggestionItem - 1 + suggestionItems.length) %
          suggestionItems.length;
        setCurrentItem(prev);
        suggestionItemRefs.current[prev]?.focus();
      }

      if (e.key === "Enter") {
        const selected = suggestionItems[currentSuggestionItem];
        if (selected) {
          setFilters((prev) => {
            if (suggestionType == "language") {
              return { ...prev, language: selected };
            }
            if (suggestionType == "folder") {
              return { ...prev, folder: selected };
            }
            if (suggestionType == "tags") {
              return { ...prev, tags: [...prev.tags, selected] };
            }
          });
          setShowSuggestion(false);
          inputRef.current?.focus();
          setInpVal(inpVal.slice(1, -1));
        }
      }

      if (e.key === "Escape") {
        setShowSuggestion(false);
        inputRef.current?.focus();
      }
    } else {
      // Removing filters from input
      if (e.key === "Backspace") {
        // If input value is empty then we will clear filters one by one
        if (inpVal == "") {
          if (filters.tags.length > 0) {
            setFilters((prev) => ({ ...prev, tags: prev.tags.slice(0, -1) }));
          } else if (filters.language) {
            setFilters((prev) => ({ ...prev, language: "" }));
          } else if (filters.folder) {
            setFilters((prev) => ({ ...prev, folder: "" }));
          }
        }
        if (inpVal == "." || inpVal == "@" || inpVal == "#") {
          setInpVal(inpVal.slice(0, -1));
          setShowSuggestion(false);
        }
      }

      if (e.key === "ArrowDown") {
        // This will ensure we stay inside items and goes up when pressed down on last item
        const next = (selectedSnippet + 1) % items.length;
        setSelectedSnippet(next);
        suggestionItemRefs.current[next]?.focus();
      }

      if (e.key === "ArrowUp") {
        // This will ensure we stay inside items and goes down when pressed up on first item
        const prev = (selectedSnippet - 1 + items.length) % items.length;
        setSelectedSnippet(prev);
        suggestionItemRefs.current[prev]?.focus();
      }

      if (e.key === "Enter") {
        const selectedResult = loadedSnippets.find(
          (snippet) => snippet._id === items[selectedSnippet].id,
        );
        selectedResult && setCurrentSnippet(selectedResult);
        setInpVal("");
        setSearchDialog(false);
      }

      if (e.key === "Escape") {
        setInpVal("");
        setSearchDialog(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInpVal(val);

    if (!mirrorRef.current || !inputRef.current || !containerRef.current)
      return;
    // Here I'm filtering the suggestion and toggling suggestion menu so it can be visible
    if (val.includes("#")) {
      const token = val.split("#").pop() || "";
      setSuggestionItems(
        tagsList
          .filter((tag) => !filters.tags.includes(tag))
          .filter((tag) => tag.startsWith(token)),
      );
      setSuggestionType("tags");
      setShowSuggestion(true);
    } else if (val.includes("@")) {
      const token = val.split("@").pop() || "";
      setSuggestionItems(
        foldersList
          .filter((folder) => filters.folder != folder)
          .filter((folder) =>
            folder.toLocaleLowerCase().startsWith(token.toLocaleLowerCase()),
          ),
      );
      setSuggestionType("folder");
      setShowSuggestion(true);
    } else if (val.includes(".")) {
      const token = val.split(".").pop() || "";
      setSuggestionItems(
        languageList
          .filter((lang) => filters.language != lang)
          .filter((lang) =>
            lang.toLocaleLowerCase().startsWith(token.toLocaleLowerCase()),
          ),
      );
      setSuggestionType("language");
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }

    // I want to show suggestion menu where user's caret is
    // So here I'm finding that position and adding little offset so it can be seen clearly
    const childRect = mirrorRef.current.getBoundingClientRect();
    const parentRect = containerRef.current.getBoundingClientRect();

    const offsetTop = childRect.top - parentRect.top;
    const offsetLeft = childRect.left - parentRect.left;
    const childHeight = mirrorRef.current.clientHeight;

    setSuggestionMenuPos({
      top: offsetTop + childHeight + 15,
      left: offsetLeft,
    });
  };

  // Ensures current items is on first items initially
  useEffect(() => {
    if (showSuggestion) {
      setCurrentItem(0);
    }
  }, [showSuggestion]);

  // Cleans inpVal and suggestion menu
  useEffect(() => {
    if (!showSearchDialog) {
      setInpVal("");
      setShowSuggestion(false);
    }
  }, [showSearchDialog]);

  const handleClick = (value: string) => {
    const selectedSnippet = loadedSnippets.find(
      (snippet) => snippet._id === value,
    );
    if (selectedSnippet) {
      setCurrentSnippet(selectedSnippet);
      addToRecentSnippets(selectedSnippet._id);
      setInpVal("");
      setSearchDialog(false);
    }
  };

  return (
    <Dialog open={showSearchDialog} onOpenChange={setSearchDialog}>
      <DialogContent
        ref={containerRef}
        className="bg-sidebar absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg border p-3 sm:w-fit"
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-neutral-300">Search Bar</DialogTitle>
          <HoverCard>
            <HoverCardTrigger className="text-sm text-neutral-400">
              <Info size={14} />
            </HoverCardTrigger>
            <HoverCardContent className="w-fit space-y-0.5 text-sm text-neutral-400">
              <p className="flex items-center gap-1.5">
                <span>Press</span>
                <kbd className="rounded-sm border bg-white/5 p-1 font-mono text-xs font-semibold">
                  #
                </kbd>
                <span>to search tags i.e. </span>
                <kbd className="rounded-sm border bg-white/5 px-1 py-0.5 font-mono text-xs font-semibold">
                  #React
                </kbd>
              </p>
              <p className="flex items-center gap-1.5">
                <span>Press</span>
                <kbd className="rounded-sm border bg-white/5 p-1 font-mono text-xs font-semibold">
                  @
                </kbd>
                <span>to search folders i.e. </span>
                <kbd className="rounded-sm border bg-white/5 px-1 py-0.5 font-mono text-xs font-semibold">
                  @Hooks
                </kbd>
              </p>
              <p className="flex items-center gap-1.5">
                <span>Press</span>
                <kbd className="rounded-sm border bg-white/5 p-1 font-mono text-xs font-semibold">
                  .
                </kbd>
                <span>to search languages i.e. </span>
                <kbd className="rounded-sm border bg-white/5 px-1 py-0.5 font-mono text-xs font-semibold">
                  .javascript
                </kbd>
              </p>
            </HoverCardContent>
          </HoverCard>
        </DialogHeader>

        <div className="bg-muted mt-3 flex items-center justify-between gap-3 rounded-lg p-1.5">
          <div className="relative flex w-full max-w-2xl flex-wrap gap-2 rounded-md p-1.5 md:w-fit">
            {/* I'm printing badges for tags, folders and language before input */}
            {/* If you change order of them, make sure you also change the order of filter removing function on 'Backspace' */}
            {filters.folder && (
              <Badge variant="outline" className="bg-orange-500/20">
                <Folder size={12} />
                {` ${filters.folder}`}
              </Badge>
            )}
            {filters.language && (
              <Badge variant="outline" className="bg-blue-500/20">
                <Code size={12} />
                {` ${filters.language}`}
              </Badge>
            )}
            {filters.tags &&
              filters.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-green-500/20">
                  {`# ${tag}`}
                </Badge>
              ))}
            <div className="relative w-fit">
              <Input
                ref={inputRef}
                type="text"
                value={inpVal}
                onChange={handleInputChange}
                onKeyDown={handleSuggestionNavigation}
                placeholder="Ex. snippet.tsx"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:outline-none"
              />
              <div
                ref={mirrorRef}
                className="invisible absolute top-0 left-0 h-full w-fit whitespace-pre"
              >
                {inpVal}
              </div>
            </div>
          </div>

          {/* <Button variant="outline" size="icon">
            <SearchIcon className="text-neutral-400" />
          </Button> */}

          {showSuggestion && suggestionItems.length > 0 && (
            <div
              className="absolute z-50 w-fit rounded-md bg-neutral-800"
              style={{
                top: `${suggestionMenuPos.top}px`,
                left: `${suggestionMenuPos.left}px`,
              }}
            >
              <ScrollArea className="flex max-h-[300px] w-fit flex-col p-2">
                {suggestionItems.map((item, i) => (
                  <button
                    key={i}
                    tabIndex={-1}
                    autoFocus={false}
                    ref={(el) => {
                      suggestionItemRefs.current[i] = el;
                    }}
                    onKeyDown={handleSuggestionNavigation}
                    className={cn(
                      "block w-full rounded px-2 py-1 text-start text-sm text-white ring-0 outline-0",
                      i === currentSuggestionItem
                        ? "bg-white/10"
                        : "hover:bg-neutral-700",
                    )}
                  >
                    {inpVal.length > 1 ? (
                      <>
                        <span className="text-blue-300">
                          {item.slice(0, inpVal.length - 1)}
                        </span>
                        {item.slice(inpVal.length - 1)}
                      </>
                    ) : (
                      item
                    )}
                  </button>
                ))}
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Snippet Results */}
        <div className="mt-3 rounded-lg bg-white/5 p-3">
          <div className="mb-2 text-sm text-neutral-400">
            {inpVal.length == 0 ? "Recent items" : "Results"}
          </div>
          {items.length === 0 ? (
            <span className="inline-block w-full text-center text-sm text-neutral-400">
              No snippets found
            </span>
          ) : (
            <>
              {/* <hr className="mb-2 border-neutral-400" /> */}
              {items.map((item, i) => (
                <div
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  ref={(el) => {
                    resultItemRefs.current[i] = el;
                  }}
                  className={cn(
                    "cursor-pointer rounded px-2 py-1 text-sm hover:bg-neutral-700",
                    i === selectedSnippet
                      ? "bg-white/10"
                      : "hover:bg-neutral-700",
                  )}
                >
                  <div className="flex justify-between gap-3 text-neutral-400">
                    <span>{item.name}</span>
                    <span className="flex items-center gap-2 text-xs text-gray-400">
                      <Folder size={12} /> {item.folderName}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
