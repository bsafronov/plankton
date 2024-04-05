import { useCallback } from "react";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
import { api } from "~/shared/lib/trpc/react";

export const useStageOnDelete = () => {
  const _deleteNode = useStageFlow.use.deleteNode();
  const { mutateAsync: deleteNode } =
    api.processTemplateFlowNode.delete.useMutation();

  const onDeleteNode = useCallback(
    async (id: string) => {
      await deleteNode(Number(id));
      _deleteNode(id);
    },
    [_deleteNode, deleteNode],
  );

  return onDeleteNode;
};
