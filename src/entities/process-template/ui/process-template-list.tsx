"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { api } from "~/shared/lib/trpc/react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/shared/ui/command";

export const ProcessTemplateList = () => {
  const { data, isLoading } = api.processTemplate.findMany.useQuery({});

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
            <CommandItem value={name} asChild key={id}>
              <Link href={`/admin/templates/${id}`}>{name}</Link>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
};
