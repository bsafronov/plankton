import { useCallback, type DragEvent } from "react";
import { type Node, type ReactFlowInstance } from "reactflow";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
import { api } from "~/shared/lib/trpc/react";

export const useStageOnDrop = (reactFlowInstance: ReactFlowInstance | null) => {
  const addNode = useStageFlow.use.addNode();

  const { mutateAsync: getStage } =
    api.processTemplateStage.findUniqueMutation.useMutation();

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

      const stage = await getStage({ id: Number(stageId), withFields: true });

      if (!stage) return;

      const newStage: Node = {
        id: stageId,
        data: stage,
        position,
        type: "stage",
      };
      addNode(newStage);
    },
    [reactFlowInstance, addNode, getStage],
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
