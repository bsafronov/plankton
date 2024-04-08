"use client";

import { Check, Loader2, X } from "lucide-react";
import { api } from "~/shared/lib/trpc/react";
import { Badge } from "~/shared/ui/badge";

type Props = {
  templateId: ID;
};
export const EndNodeList = ({ templateId }: Props) => {
  const { data: endNodes, isLoading } =
    api.processTemplateFlowNode.getEndNodes.useQuery({
      templateId,
    });

  if (isLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!!!endNodes?.length) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <X className="size-4 text-destructive" /> Конечных этапов не найдено
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <Check className="size-4 text-emerald-500" />
      Конечные этапы:
      {endNodes.map((item) => (
        <Badge key={item.stageId} variant={"secondary"}>
          {item.stage.name}
        </Badge>
      ))}
    </div>
  );
};
