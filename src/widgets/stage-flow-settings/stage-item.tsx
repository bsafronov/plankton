"use client";

import { type ProcessTemplateStage } from "@prisma/client";
import { Check } from "lucide-react";
import { type DragEvent } from "react";
import { useSelectedStage } from "~/entities/process-template/lib/use-selected-stage";
import { CommandItem } from "~/shared/ui/command";

type Props = {
  stage: ProcessTemplateStage;
};

export const StageItem = ({ stage }: Props) => {
  const { setStageId, stageId } = useSelectedStage();
  const { id, name } = stage;
  const onDragStart = (event: DragEvent<HTMLDivElement>, id: ID) => {
    event.dataTransfer.setData("application/stageflow", `${id}`);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <CommandItem value={name} asChild>
      <div
        className="flex justify-between gap-2"
        onClick={() => setStageId(stageId === id ? null : id)}
        draggable
        onDragStart={(e) => onDragStart(e, id)}
      >
        <div className="truncate">{name}</div>
        {stageId === id && <Check className="size-4" />}
      </div>
    </CommandItem>
  );
};
