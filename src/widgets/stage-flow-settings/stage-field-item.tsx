import type {
  EnumItem,
  FieldType,
  ProcessTemplateField,
  ProcessTemplateStageField,
} from "@prisma/client";
import { Edit, Link, MoreVertical, Trash } from "lucide-react";
import { type ReactNode } from "react";
import { useBoolean } from "usehooks-ts";
import { DeleteProcessTemplateStageField } from "~/features/delete-process-template-stage-field";
import { UpdateProcessTemplateStageField } from "~/features/update-process-template-stage-field";
import { api } from "~/shared/lib/trpc/react";
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
  { name, placeholder, description }: Props["stageField"],
  enumItems?: EnumItem[],
): Record<FieldType, ReactNode> => ({
  BOOLEAN: (
    <div className="flex gap-2">
      <Checkbox />
      <div className="flex flex-col">
        <span className={labelVariants()}>{name}</span>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  ),
  ENUM: (
    <div>
      <span className={labelVariants()}>{name}</span>
      <MySelect options={enumItems} />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  ),
  NUMBER: (
    <div>
      <span className={labelVariants()}>{name}</span>
      <Input type="number" placeholder={placeholder ?? undefined} />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  ),
  STRING: (
    <div>
      <span className={labelVariants()}>{name}</span>
      <Input type="text" placeholder={placeholder ?? undefined} />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  ),
});

export const StageFieldItem = ({
  stageField,
  templateFields,
  templateId,
}: Props) => {
  const { templateFieldId } = stageField;
  const { value: openUpdate, toggle: toggleUpdate } = useBoolean();
  const { value: openDelete, toggle: toggleDelete } = useBoolean();
  const templateField = templateFields.find((v) => v.id === templateFieldId)!;

  const { data: enumItems } = api.enumItem.findMany.useQuery(
    { enumId: templateField.enumId! },
    {
      enabled: !!templateField.enumId,
    },
  );

  return (
    <div className="rounded-md bg-muted/30 p-2">
      <div className="mb-4 flex justify-between gap-2">
        <span className="flex items-center text-xs text-blue-500">
          <Link className="size-4" />
          &nbsp;
          {templateField.name}&nbsp;|&nbsp;
          {templateField.type}
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

      {getInputByType(stageField, enumItems)[templateField.type]}

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

      <DeleteProcessTemplateStageField
        stageFieldId={stageField.id}
        onCancel={toggleDelete}
        open={openDelete}
      />
    </div>
  );
};
