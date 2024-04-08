import { api } from "~/shared/lib/trpc/server";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/shared/ui/command";
import { UpdatePositionDialog } from "./update-position/dialog";
import { DeletePositionDialog } from "./delete-position/dialog";

export const PositionSearchableList = async () => {
  const positions = await api.product.findMany({});

  return (
    <Command>
      <CommandInput />
      <CommandList className="p-1">
        <CommandEmpty />
        {positions.map((item) => (
          <CommandItem key={item.id}>
            <div className="flex w-full justify-between">
              {item.name}
              <div className="flex items-center gap-2">
                <UpdatePositionDialog item={item} />
                <DeletePositionDialog itemId={item.id} />
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
