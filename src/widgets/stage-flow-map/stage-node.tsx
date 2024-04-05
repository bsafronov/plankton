"use client";

import type {
  ProcessTemplateField,
  ProcessTemplateStage,
} from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { useSelectedStage } from "~/entities/process-template/lib/use-selected-stage";
import { cn } from "~/shared/lib/utils";
import { MyAlertDialog } from "~/shared/ui-my/my-alert-dialog";
import { CustomHandle } from "./custom-handle";
import { useStageOnDelete } from "./use-stage-on-delete";

type Data = ProcessTemplateStage & {
  fields: ProcessTemplateField[];
};

const Node = ({ id, data, isConnectable }: NodeProps<Data>) => {
  const setStageId = useSelectedStage().setStageId;
  const onDelete = useStageOnDelete();

  const { name, fields } = data;

  return (
    <div className="min-w-[160px] max-w-[320px] rounded-md border bg-background">
      <div className="relative flex items-baseline justify-between gap-2 rounded-t bg-muted bg-muted px-2 py-2">
        <Handle
          type="source"
          id={`stage-${id}-left`}
          position={Position.Left}
          className="top-3 h-2 w-2 border-border bg-emerald-400"
          isConnectable={isConnectable}
        />
        <Handle
          type="target"
          id={`stage-${id}-left`}
          position={Position.Left}
          className={cn("top-6 h-2 w-2 border-border bg-amber-400")}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          id={`stage-${id}-right`}
          position={Position.Right}
          className="top-3 h-2 w-2 border-border bg-emerald-400"
          isConnectable={isConnectable}
        />

        <Handle
          type="target"
          id={`stage-${id}-right`}
          position={Position.Right}
          className="top-6 h-2 w-2 border-border bg-amber-400"
          isConnectable={isConnectable}
        />
        <p className="line-clamp-2 hyphens-auto text-sm">{name}</p>
        <div className="flex gap-1">
          <button
            className="text-blue-500 hover:text-blue-400"
            onClick={() => setStageId(Number(id))}
          >
            <Edit className="size-4" />
          </button>
          <MyAlertDialog
            description="Все связи будут удалены!"
            trigger={
              <button className="text-destructive hover:text-destructive/70">
                <Trash className="size-4" />
              </button>
            }
            onSubmit={() => onDelete(id)}
          />
        </div>
      </div>
      <div className="divide-y border-t">
        {fields.map((item) => (
          <div
            key={item.id}
            className="relative flex items-center px-2 text-sm"
          >
            <CustomHandle
              type="source"
              id={`field-${id}-${item.id}-left`}
              position={Position.Left}
              className="h-2 w-2 border-border bg-emerald-400"
              isConnectable={isConnectable}
              nodeId={`${id}`}
            />
            <CustomHandle
              type="source"
              id={`field-${id}-${item.id}-right`}
              position={Position.Right}
              className="h-2 w-2 border-border bg-emerald-400"
              isConnectable={isConnectable}
              nodeId={`${id}`}
            />
            {item.name}
          </div>
        ))}
        {fields.length === 0 && (
          <p className="px-2 text-sm text-muted-foreground">Поля отсутствуют</p>
        )}
      </div>
    </div>
  );
};

export const StageNode = memo(Node);
