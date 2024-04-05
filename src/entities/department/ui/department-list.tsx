"use client";

import { Loader2 } from "lucide-react";
import { DeleteDepartment } from "~/features/delete-department";
import { UpdateDepartment } from "~/features/update-department";
import { api } from "~/shared/lib/trpc/react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/shared/ui/command";

export const DepartmentList = () => {
  const { data, isLoading } = api.department.findMany.useQuery({});

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

          {data.map((item) => (
            <CommandItem value={item.name} key={item.id} asChild>
              <div className="flex justify-between gap-2">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <IconButton icon={MoreVertical} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem className="justify-between">
                      Изменить
                      <Edit className="size-4 text-blue-500" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="justify-between">
                      Удалить
                      <Trash className="size-4 text-destructive" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
                {item.name}
                <div className="flex gap-2">
                  <UpdateDepartment {...item} />
                  <DeleteDepartment departmentId={item.id} />
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
};
