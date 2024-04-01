"use client";

import { Check, Loader2 } from "lucide-react";
import { type FindManyProcessTemplateStageSchema } from "~/entities/process-template/lib/schema";
import { useSelectedStage } from "~/entities/process-template/lib/use-selected-stage";
import { api } from "~/shared/lib/trpc/react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/shared/ui/command";

export const StageList = (props: FindManyProcessTemplateStageSchema) => {
  const { setStageId, stageId } = useSelectedStage();
  const { data, isLoading } = api.processTemplateStage.findMany.useQuery(props);

  return (
    <Command className="border-none">
      <CommandInput />
      {isLoading && (
        <div className="p-2">
          <Loader2 className="block animate-spin" />
        </div>
      )}
      {data && (
        <CommandList className="max-h-none p-1">
          <CommandEmpty />

          {data.map(({ id, name }) => (
            <CommandItem value={name} key={id} asChild>
              <div
                className="flex justify-between gap-2"
                onClick={() => setStageId(stageId === id ? null : id)}
              >
                <div className="truncate">{name}</div>
                {stageId === id && <Check className="size-4" />}
              </div>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
};
