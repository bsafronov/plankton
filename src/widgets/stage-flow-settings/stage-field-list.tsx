"use client";

import { type FindManyProcessTemplateStageFieldSchema } from "~/entities/process-template/lib/schema";
import { api } from "~/shared/lib/trpc/react";
import { StageFieldItem } from "./stage-field-item";

type Props = {
  templateId: ID;
  params: FindManyProcessTemplateStageFieldSchema;
};
export const StageFieldList = ({ params, templateId }: Props) => {
  const { data } = api.processTemplateStageField.findMany.useQuery(params);
  const { data: templateFields } = api.processTemplateField.findMany.useQuery({
    templateId,
  });

  if (!templateFields) {
    return null;
  }

  return (
    <div className="space-y-2">
      {data?.map((item) => (
        <StageFieldItem
          key={item.id}
          stageField={item}
          templateFields={templateFields}
          templateId={templateId}
        />
      ))}
    </div>
  );
};
