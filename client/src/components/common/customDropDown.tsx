import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { useState } from "react";

export type DropDownItem = {
  label: string;
  value: string;
  id?: string;
};

type CustomDropDownProps = {
  items: DropDownItem[];
  selected: string;
  title: string;
  onSelected: (value: string) => void;
  variant?: "xs" | "md" | "lg";
};
export function CustomDropDown({
  items,
  selected,
  onSelected,
  title,
  variant = "md",
}: CustomDropDownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-fit justify-between ${
            variant == "xs" ? "h-6" : variant == "md" ? "h-9" : "h-10"
          } `}
        >
          {selected
            ? items.find((item) => item.value === selected)?.label
            : `Select ${title}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${title}...`}
            className={` p-1 ${variant == "xs" ? "h-4" : "h-6"} `}
          />
          <CommandList>
            <CommandEmpty>No {title} found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onSelected(currentValue);

                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected === item.value ? "opacity-100" : "opacity-0"
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
