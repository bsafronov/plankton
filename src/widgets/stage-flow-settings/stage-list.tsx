"use client";

import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { type FindManyProcessTemplateStageSchema } from "~/entities/process-template/lib/stage-schema";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
import { api } from "~/shared/lib/trpc/react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "~/shared/ui/command";
import { StageItem } from "./stage-item";

export const StageList = (props: FindManyProcessTemplateStageSchema) => {
  const stageIds = useStageFlow().stageIds;
  const { data: stages, isLoading } =
    api.processTemplateStage.findMany.useQuery(props);

  const remainStages = useMemo(() => {
    return stages?.filter((item) => !stageIds.includes(item.id));
  }, [stages, stageIds]);

  return (
    <Command className="border-none">
      <CommandInput />
      {isLoading && (
        <div className="p-2">
          <Loader2 className="block animate-spin" />
        </div>
      )}
      {stages && (
        <CommandList className="max-h-none  p-1">
          <CommandEmpty />

          {remainStages?.map((item) => (
            <StageItem stage={item} key={item.id} />
          ))}
        </CommandList>
      )}
    </Command>
  );
};
