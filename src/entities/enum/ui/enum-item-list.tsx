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
import { type FindManyEnumItemSchema } from "../lib/schema";

export const EnumItemList = (props: FindManyEnumItemSchema) => {
  const { data, isLoading } = api.enumItem.findMany.useQuery(props);

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
              <Link href={`/admin/enums/${id}`}>{name}</Link>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
};
