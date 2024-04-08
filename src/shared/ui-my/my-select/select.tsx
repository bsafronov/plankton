"use client";

import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { type Ref, forwardRef } from "react";
import type {
  SelectBy,
  SelectByDefault,
  SelectOptions,
  SelectProps,
} from "./types";
import { useSelect } from "./use-select";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/popover";
import { Button } from "~/shared/ui/button";
import { cn } from "~/shared/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/shared/ui/command";

const Select = <
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectByDefault<Options>,
  Multi extends boolean = false,
>(
  props: SelectProps<Options, By, Multi>,
  ref?: Ref<HTMLButtonElement>,
) => {
  const {
    open,
    setOpen,
    options,
    value,
    getOptionLabel,
    getLabelSelected,
    isCustomLabelSelected,
    getOptionValue,
    onSelect,
    isSelected,
    hasSearch,
    hasValue,
    onDelete,
  } = useSelect(props);
  const { id, disabled, onBlur, name, isLoading } = props;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          disabled={disabled}
          onBlur={onBlur}
          name={name}
          variant={"outline"}
          id={id}
          className={cn(
            "group flex h-auto min-h-10 w-full items-stretch p-0 text-sm font-normal transition-none hover:bg-muted",
          )}
          type="button"
        >
          <div
            className={cn(
              "flex grow flex-wrap items-center justify-start gap-1 py-1 pl-3",
              isCustomLabelSelected() ||
                (Array.isArray(value) && hasValue() && "pl-1"),
            )}
          >
            {!hasValue() && <p className="text-slate-500">Выбрать...</p>}
            {hasValue() &&
              Array.isArray(value) &&
              value.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    !isCustomLabelSelected() &&
                      "flex items-stretch divide-x overflow-hidden rounded-md border bg-white",
                  )}
                >
                  <div className="px-2 py-0.5">{getLabelSelected(item)}</div>
                  <div
                    className="flex items-center justify-center px-1 text-slate-500 hover:bg-red-100 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item);
                    }}
                  >
                    <X className="size-4" />
                  </div>
                </div>
              ))}
            {hasValue() && !Array.isArray(value) && (
              <div>{getLabelSelected(value!)}</div>
            )}
          </div>
          {isLoading && (
            <div className="flex items-center">
              <Loader2 className="size-4 animate-spin" />
            </div>
          )}
          <div
            className={cn(
              "flex items-center px-2 text-muted-foreground/50 group-hover:text-muted-foreground",
              open && "text-muted-foreground",
            )}
          >
            <ChevronsUpDown className="size-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] border-none p-0">
        <Command>
          {hasSearch() && <CommandInput placeholder="Поиск..." />}
          <CommandList className="p-1">
            <CommandEmpty>Ничего не найдено...</CommandEmpty>
            {options.map((option, i) => (
              <CommandItem
                key={i}
                value={getOptionValue(option, i)}
                onSelect={() => onSelect(option)}
                className="flex justify-between gap-2"
              >
                {getOptionLabel(option)}
                <Check
                  className={cn(
                    "size-4 opacity-0",
                    isSelected(option) && "opacity-100",
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// @ts-expect-error Type instantiation is excessively deep and possibly infinite
export const MySelect = forwardRef(Select) as <
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectByDefault<Options>,
  Multi extends boolean = false,
>(
  props: SelectProps<Options, By, Multi> & { ref?: Ref<HTMLButtonElement> },
) => JSX.Element;
