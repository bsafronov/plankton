import { useCallback, type DragEvent } from "react";
import { type ReactFlowInstance } from "reactflow";
import { useStageOnAdd } from "./use-stage-on-add";

export const useStageOnDrop = (reactFlowInstance: ReactFlowInstance | null) => {
  const { addNode } = useStageOnAdd();

  const onDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const stageId = event.dataTransfer.getData("application/stageflow");

      if (typeof stageId === "undefined" || !stageId) {
        return;
      }
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (!position) return;

      await addNode({ stageId, position });
    },
    [reactFlowInstance, addNode],
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return {
    onDrop,
    onDragOver,
  };
};
