"use client";

import type {
  ProcessTemplateField,
  ProcessTemplateStageField,
} from "@prisma/client";
import { z } from "zod";
import { SelectEnumItemByName } from "~/entities/enum/ui/select-enum-item";
import { useZodForm } from "~/shared/lib/use-form";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Checkbox } from "~/shared/ui/checkbox";
import { Input } from "~/shared/ui/input";

type Props = {
  templateStageFields: (ProcessTemplateStageField & {
    templateField: ProcessTemplateField;
  })[];
};

const schema = z.object({
  fields: z.array(z.string()),
});

export const ProcessStageForm = ({ templateStageFields }: Props) => {
  const form = useZodForm(schema, {
    values: {
      fields: templateStageFields.map((_) => ""),
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const res = templateStageFields.map((item, i) => ({
      fieldId: item.id,
      value: data.fields[i],
    }));
    console.log(res);
  });

  return (
    <MyForm form={form} onSubmit={onSubmit}>
      {templateStageFields.map((field, i) => (
        <MyFormField
          key={i}
          control={form.control}
          name={`fields.${i}`}
          label={field.name}
          description={field.description ?? undefined}
          placement={
            field.templateField.type === "BOOLEAN" ? "checkbox" : undefined
          }
          render={(props) => {
            const type = field.templateField.type;

            if (type === "STRING") {
              return (
                <Input
                  {...props}
                  type="string"
                  placeholder={field.placeholder ?? undefined}
                />
              );
            }

            if (type === "NUMBER") {
              return (
                <Input
                  {...props}
                  type="number"
                  placeholder={field.placeholder ?? undefined}
                />
              );
            }

            if (type === "BOOLEAN") {
              const { value, onChange, ...rest } = props;
              return (
                <Checkbox
                  {...rest}
                  checked={value === "Да" ? true : false}
                  onCheckedChange={(v) => onChange(v ? "Да" : "Нет")}
                />
              );
            }

            if (type === "ENUM") {
              const enumId = field.templateField.enumId;
              if (!enumId) return null;
              const { value, onChange, ...rest } = props;
              return (
                <SelectEnumItemByName
                  {...rest}
                  enumId={enumId}
                  value={value === "" ? null : value}
                  onChange={(v) => (v ? onChange(v) : "")}
                />
              );
            }
          }}
        />
      ))}
    </MyForm>
  );
};
