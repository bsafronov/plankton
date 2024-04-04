import type { Node, XYPosition } from "reactflow";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
import { api } from "~/shared/lib/trpc/react";

export const useStageOnAdd = () => {
  const _addNode = useStageFlow.use.addNode();
  const { mutateAsync: getStage } =
    api.processTemplateStage.findUniqueMutation.useMutation();
  // const { mutateAsync: createNode } =
  //   api.processTemplateFlowNode.create.useMutation();

  const addNode = async ({
    stageId,
    position,
  }: {
    stageId: string;
    position: XYPosition;
  }) => {
    const stage = await getStage({ id: Number(stageId), withFields: true });

    if (!stage) return;

    // await createNode({
    //   posX: position.x,
    //   posY: position.y,
    //   stageId: stage.id,
    //   templateId: stage.templateId,
    // });

    const node: Node = {
      id: stageId,
      data: stage,
      position,
      type: "stage",
    };

    _addNode(node);
  };

  return {
    addNode,
  };
};
