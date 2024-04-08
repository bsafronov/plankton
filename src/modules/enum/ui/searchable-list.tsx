import { api } from "~/shared/lib/trpc/server";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/shared/ui/command";
import { UpdateEnumDialog } from "./update-enum/dialog";
import { DeleteEnumDialog } from "./delete-enum/dialog";
import Link from "next/link";

export const EnumSearchableList = async () => {
  const enums = await api.enum.findMany({});

  return (
    <Command>
      <CommandInput />
      <CommandList className="p-1">
        <CommandEmpty />
        {enums.map((item) => (
          <CommandItem key={item.id}>
            <div className="flex w-full justify-between">
              <Link href={`/admin/enums/${item.id}`}>{item.name}</Link>
              <div className="flex items-center gap-2">
                <UpdateEnumDialog item={item} />
                <DeleteEnumDialog itemId={item.id} />
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
