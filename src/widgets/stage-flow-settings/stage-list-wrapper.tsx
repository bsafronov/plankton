"use client";

import { CreateProcessTemplateStage } from "~/features/create-process-template-stage";
import { StageList } from "./stage-list";

type Props = {
  templateId: ID;
};
export const StageListWrapper = ({ templateId }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="border-b p-2">
        <CreateProcessTemplateStage templateId={templateId} />
      </div>
      <StageList templateId={templateId} />
    </div>
  );
};
