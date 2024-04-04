import { useCallback, useEffect, useState } from "react";
import { type NodeChange } from "reactflow";
import { useDebounceCallback } from "usehooks-ts";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
import { api } from "~/shared/lib/trpc/react";

export const useOnNodesChange = () => {
  const _onNodesChange = useStageFlow.use.onNodesChange();
  const nodes = useStageFlow.use.nodes();
  const [changes, setChanges] = useState<NodeChange[]>();
  const debounceChanges = useDebounceCallback(setChanges, 1000);
  // const { mutate: updateNode } =
  //   api.processTemplateFlowNode.update.useMutation();

  useEffect(() => {
    const updateNodePosition = async () => {
      const change = changes?.[0];

      if (!change) {
        return;
      }

      if (!("id" in change)) return;

      const node = nodes.find((v) => v.id === change.id);

      if (!node) return;

      const position = node.position;

      // updateNode({
      //   id: node.data.id,
      //   posX: position.x,
      //   posY: position.y,
      // });
    };

    void updateNodePosition();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changes]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      debounceChanges(changes);
      _onNodesChange(changes);
    },
    [_onNodesChange, debounceChanges],
  );

  return onNodesChange;
};
