import type {
  FieldType,
  ProcessTemplateField,
  ProcessTemplateStageField,
} from "@prisma/client";
import { Edit, Link, MoreVertical, Trash } from "lucide-react";
import { type ReactNode } from "react";
import { useBoolean } from "usehooks-ts";
import { UpdateProcessTemplateStageField } from "~/features/update-process-template-stage-field";
import { api } from "~/shared/lib/trpc/react";
import { MyAlertDialog } from "~/shared/ui-my/my-alert-dialog";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MySelect } from "~/shared/ui-my/my-select";
import { Checkbox } from "~/shared/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/shared/ui/dropdown-menu";
import { Input } from "~/shared/ui/input";
import { labelVariants } from "~/shared/ui/label";

type Props = {
  stageField: ProcessTemplateStageField;
  templateFields: ProcessTemplateField[];
  templateId: ID;
};

const getInputByType = (
  placeholder: string | null,
): Record<FieldType, ReactNode> => ({
  BOOLEAN: <Checkbox />,
  ENUM: <MySelect />,
  NUMBER: <Input type="number" placeholder={placeholder ?? undefined} />,
  STRING: <Input type="text" placeholder={placeholder ?? undefined} />,
});

export const StageFieldItem = ({
  stageField,
  templateFields,
  templateId,
}: Props) => {
  const { description, name, templateFieldId, placeholder } = stageField;
  const { value: openUpdate, toggle: toggleUpdate } = useBoolean();
  const { value: openDelete, toggle: toggleDelete } = useBoolean();
  const templateField = templateFields.find((v) => v.id === templateFieldId)!;

  const ctx = api.useUtils();
  const { mutate: deleteField } =
    api.processTemplateStageField.delete.useMutation({
      onSuccess: () => {
        void ctx.processTemplateStageField.findMany.invalidate({
          stageId: stageField.stageId,
        });
      },
    });

  return (
    <div className="rounded-md bg-muted/30 p-2">
      <div className="mb-4 flex justify-between gap-2">
        <span className="flex items-center gap-2 text-xs text-blue-500">
          <Link className="size-4" />
          {templateField.name}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground">
            <MoreVertical className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="justify-between"
              onClick={toggleUpdate}
            >
              Изменить
              <Edit className="size-4 text-blue-500" />
            </DropdownMenuItem>

            <DropdownMenuItem
              className="justify-between"
              onClick={toggleDelete}
            >
              Удалить
              <Trash className="size-4 text-destructive" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <span className={labelVariants()}>{name}</span>
      {getInputByType(placeholder)[templateField.type]}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <MyDialog
        open={openUpdate}
        onOpenChange={toggleUpdate}
        title="Изменение поля этапа"
      >
        <UpdateProcessTemplateStageField
          templateId={templateId}
          stageFieldId={stageField.id}
          onSuccess={toggleUpdate}
        />
      </MyDialog>

      <MyAlertDialog
        open={openDelete}
        onCancel={toggleDelete}
        onSubmit={() => deleteField(stageField.id)}
      />
    </div>
  );
};
