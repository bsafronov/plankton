"use client";

import { X } from "lucide-react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "reactflow";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
import { cn } from "~/shared/lib/utils";

export const StageEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
}: EdgeProps) => {
  const deleteEdge = useStageFlow().deleteEdge;
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd="" />
      <EdgeLabelRenderer>
        <button
          className={cn(
            "flex items-center justify-center rounded-full bg-background text-xs text-muted-foreground hover:text-primary",
            label && "px-1",
          )}
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          onClick={() => deleteEdge(id)}
        >
          {label ? label : <X className="size-3" />}
        </button>
      </EdgeLabelRenderer>
    </>
  );
};
