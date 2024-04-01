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

export const PositionList = () => {
  const { data, isLoading } = api.position.findMany.useQuery({});

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
            <CommandItem value={name} key={id} asChild>
              <Link href={`/admin/positions/${id}`}>{name}</Link>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
};
