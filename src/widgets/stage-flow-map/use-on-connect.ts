import { useParams } from "next/navigation";
import { useCallback } from "react";
import type { Connection, Edge } from "reactflow";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
import { api } from "~/shared/lib/trpc/react";

export const useOnConnect = () => {
  const { templateId } = useParams();
  const _onConnect = useStageFlow.use.onConnect();
  const _setConnectDialog = useStageFlow.use.setConnectDialog();
  const { mutateAsync: createEdge } =
    api.processTemplateFlowEdge.create.useMutation();

  const onConnect = useCallback(
    async (connection: Connection | Edge) => {
      if (connection.sourceHandle?.split("-")[0] === "field") {
        return _setConnectDialog(connection);
      }
      const { source, target, sourceHandle, targetHandle } = connection;

      const { id } = await createEdge({
        sourceHandle: sourceHandle!,
        targetHandle: targetHandle!,
        sourceId: Number(source),
        targetId: Number(target),
        templateId: Number(templateId),
      });

      _onConnect({ ...connection, id: id.toString() });
    },
    [_onConnect, _setConnectDialog, createEdge, templateId],
  );

  const onConnectSubmit = useCallback(
    async (connection: Connection | Edge) => {
      if (!("label" in connection)) return;
      const { source, target, sourceHandle, targetHandle } = connection;
      const stageFieldId = sourceHandle?.split("-")[2];
      const { id } = await createEdge({
        sourceHandle: sourceHandle!,
        targetHandle: targetHandle!,
        sourceId: Number(source),
        targetId: Number(target),
        templateId: Number(templateId),
        value: connection.label as string,
        stageFieldId: Number(stageFieldId),
      });

      _onConnect({ ...connection, id: id.toString() });
    },
    [_onConnect, createEdge, templateId],
  );

  return {
    onConnectSubmit,
    onConnect,
  };
};
