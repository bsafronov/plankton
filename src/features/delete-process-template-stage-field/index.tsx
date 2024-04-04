"use client";

import { type ComponentPropsWithoutRef } from "react";
import { api } from "~/shared/lib/trpc/react";
import { MyAlertDialog } from "~/shared/ui-my/my-alert-dialog";

type Props = {
  stageFieldId: ID;
} & Pick<ComponentPropsWithoutRef<typeof MyAlertDialog>, "open" | "onCancel">;

export const DeleteProcessTemplateStageField = ({
  stageFieldId,
  ...props
}: Props) => {
  const ctx = api.useUtils();
  const { mutate: deleteField } =
    api.processTemplateStageField.delete.useMutation({
      onSuccess: () => {
        void ctx.processTemplateStageField.findMany.invalidate();
      },
    });
  return (
    <MyAlertDialog {...props} onSubmit={() => deleteField(stageFieldId)} />
  );
};
