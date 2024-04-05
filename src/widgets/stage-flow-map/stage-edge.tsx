"use client";

import { X } from "lucide-react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "reactflow";
import { cn } from "~/shared/lib/utils";
import { useEdgeOnDelete } from "./use-edge-on-delete";

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
  const deleteEdge = useEdgeOnDelete();
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
            "rounded-full bg-background text-[10px] leading-none text-muted-foreground hover:text-primary",
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
