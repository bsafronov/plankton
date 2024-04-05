import { useCallback } from "react";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
import { api } from "~/shared/lib/trpc/react";

export const useEdgeOnDelete = () => {
  const _deleteEdge = useStageFlow.use.deleteEdge();
  const { mutateAsync: deleteEdge } =
    api.processTemplateFlowEdge.delete.useMutation();
  const onDeleteEdge = useCallback(
    async (id: string) => {
      await deleteEdge(Number(id));
      _deleteEdge(id);
    },
    [_deleteEdge, deleteEdge],
  );

  return onDeleteEdge;
};
