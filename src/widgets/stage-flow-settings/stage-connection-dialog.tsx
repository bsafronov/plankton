/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Edge, Connection } from "reactflow";
import { z } from "zod";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
import { api } from "~/shared/lib/trpc/react";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { MySelect } from "~/shared/ui-my/my-select";
import { Input } from "~/shared/ui/input";
import { useOnConnect } from "../stage-flow-map/use-on-connect";

export const StageConnectDialog = () => {
  const connection = useStageFlow.use.connectDialog();
  const closeConnectDialog = useStageFlow.use.closeConnectDialog();

  return (
    <MyDialog
      title="Создание связи"
      open={!!connection}
      onOpenChange={closeConnectDialog}
    >
      {connection && <StageConnectDialogContent {...connection} />}
    </MyDialog>
  );
};

const schema = z.object({
  value: z.string(),
});

const StageConnectDialogContent = (connection: Connection | Edge) => {
  const stageFieldId = Number(connection.sourceHandle?.split("-")[2]);
  const { onConnectSubmit } = useOnConnect();

  const { data: stageField } =
    api.processTemplateStageField.findUnique.useQuery(stageFieldId);
  const { data: templateField } = api.processTemplateField.findUnique.useQuery(
    stageField?.templateFieldId!,
    {
      enabled: !!stageField,
    },
  );
  const { data: enumItems, isLoading } = api.enumItem.findMany.useQuery(
    { enumId: templateField?.enumId! },
    {
      enabled: !!(templateField?.type === "ENUM" && templateField.enumId),
    },
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      value: "",
    },
  });

  const onSubmit = form.handleSubmit(
    (data) =>
      void onConnectSubmit({
        ...connection,
        label: data.value,
      }),
  );

  return (
    <MyForm form={form} onSubmit={onSubmit}>
      <MyFormField
        control={form.control}
        name="value"
        label="Значение"
        render={(props) => {
          const type = templateField?.type;

          if (!type) {
            return null;
          }

          if (type === "NUMBER") {
            return <Input type="number" {...props} />;
          }

          if (type === "STRING") {
            return <Input type="text" {...props} />;
          }

          if (type === "ENUM") {
            return (
              <MySelect
                options={enumItems}
                by="name"
                isLoading={isLoading}
                {...props}
              />
            );
          }

          if (type === "BOOLEAN") {
            return (
              <MySelect
                options={[
                  { value: "Да", label: "Да" },
                  { value: "Нет", label: "Нет" },
                ]}
                by="label"
                {...props}
              />
            );
          }
        }}
      />
    </MyForm>
  );
};
