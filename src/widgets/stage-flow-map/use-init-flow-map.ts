import { useParams } from "next/navigation";
import { useEffect } from "react";
import type { Edge, Node } from "reactflow";
import {
  useStageFlow,
  type StageNodeData,
} from "~/entities/process-template/lib/use-stage-flow";
import { api } from "~/shared/lib/trpc/react";

export const useInitFlowMap = () => {
  const { templateId } = useParams();
  const _setNodes = useStageFlow.use.setNodes();
  const _setEdges = useStageFlow.use.setEdges();
  const { data: nodes } = api.processTemplateFlowNode.findMany.useQuery({
    templateId: Number(templateId),
  });
  const { data: edges } = api.processTemplateFlowEdge.findMany.useQuery({
    templateId: Number(templateId),
  });

  useEffect(() => {
    const generateNodes = () => {
      if (!nodes || !edges) return;

      const preparedNodes: Node<StageNodeData>[] = nodes.map((node) => ({
        id: node.stageId.toString(),
        data: node.stage,
        position: {
          x: node.posX,
          y: node.posY,
        },
        type: "stage",
      }));
      _setNodes(preparedNodes);

      const preparedEdges: Edge[] = edges.map((edge) => ({
        id: edge.id.toString(),
        source: edge.sourceId.toString(),
        target: edge.targetId.toString(),
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        label: edge.value,
        type: "stage",
      }));
      _setEdges(preparedEdges);
    };

    generateNodes();
  }, [templateId, nodes, edges, _setEdges, _setNodes]);
};
