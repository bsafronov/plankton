"use client";

import { CreateProcessTemplateStage } from "~/features/create-process-template-stage";
import { StageList } from "./stage-list";
import { StageItem } from "./stage-item";

type Props = {
  templateId: ID;
};
export const StageFlowSettings = ({ templateId }: Props) => {
  return (
    <div className="flex min-w-72 max-w-72 flex-col">
      <div className="flex h-[50%] max-h-[50%] flex-col border-b">
        <div className="border-b p-2">
          <CreateProcessTemplateStage templateId={templateId} />
        </div>
        <StageList templateId={templateId} />
      </div>
      <div className="grow overflow-hidden">
        <StageItem templateId={templateId} />
      </div>
    </div>
  );
};
