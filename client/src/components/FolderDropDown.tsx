import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { capitalize, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppStore } from "@/store/appStore";

type FolderDropDownProps = {
  value: string;
  onUpdate: (value: string) => void;
};
export function FolderDropDown({ value, onUpdate }: FolderDropDownProps) {
  const [open, setOpen] = React.useState(false);
  const { loadedFolders } = useAppStore();

  const folderList = React.useMemo(() => {
    return loadedFolders;
  }, [loadedFolders]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between h-9"
        >
          {value
            ? folderList.find((folder) => folder.name === value)?.name
            : "Select folder..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search folder..." className="h-4" />
          <CommandList>
            <CommandEmpty>No folder found.</CommandEmpty>
            <CommandGroup>
              {folderList.map((folder) => (
                <CommandItem
                  key={folder._id}
                  value={folder.name}
                  onSelect={(currentValue) => {
                    onUpdate(currentValue);
                    setOpen(false);
                  }}
                >
                  {capitalize(folder.name)}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === folder.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
