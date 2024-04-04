"use client";

import { useSelectedStage } from "~/entities/process-template/lib/use-selected-stage";
import { StageItemWrapper } from "./stage-item-wrapper";
import { StageListWrapper } from "./stage-list-wrapper";
import { StageConnectDialog } from "./stage-connection-dialog";

type Props = {
  templateId: ID;
};
export const StageFlowSettings = ({ templateId }: Props) => {
  const stageId = useSelectedStage().stageId;

  return (
    <div className="flex min-w-72 max-w-72 flex-col overflow-y-auto">
      {stageId ? (
        <StageItemWrapper />
      ) : (
        <StageListWrapper templateId={templateId} />
      )}
      <StageConnectDialog />
    </div>
  );
};
