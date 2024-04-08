"use client";

import { Check, Loader2, X } from "lucide-react";
import { api } from "~/shared/lib/trpc/react";
import { Badge } from "~/shared/ui/badge";

type Props = {
  templateId: ID;
};
export const StartNode = ({ templateId }: Props) => {
  const { data: startNode, isLoading } =
    api.processTemplateFlowNode.getStartNode.useQuery({
      templateId,
    });

  if (isLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!startNode) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <X className="size-4 text-destructive" /> Начального этапа не найдено
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <Check className="size-4 text-emerald-500" /> Начальный этап:{" "}
      <Badge variant={"secondary"}>{startNode.stage.name}</Badge>
    </div>
  );
};
