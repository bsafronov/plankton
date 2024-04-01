"use client";

import { Loader2 } from "lucide-react";
import { api } from "~/shared/lib/trpc/react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/shared/ui/command";
import { type FindManyProcessTemplateFieldSchema } from "../lib/schema";

export const ProcessTemplateFieldList = (
  props: FindManyProcessTemplateFieldSchema,
) => {
  const { data, isLoading } = api.processTemplateField.findMany.useQuery(props);

  return (
    <Command>
      <CommandInput />
      {isLoading && (
        <div className="p-2">
          <Loader2 className="block animate-spin" />
        </div>
      )}
      {data && (
        <CommandList className="p-1">
          <CommandEmpty />

          {data.map(({ id, name }) => (
            <CommandItem value={name} key={id}>
              {name}
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
};
