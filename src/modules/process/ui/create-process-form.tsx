"use client";

import { useZodForm } from "~/shared/lib/use-form";
import { createProcessSchema } from "../lib/process-schema";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { MySelect } from "~/shared/ui-my/my-select";
import { api } from "~/shared/lib/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  onSuccess?: () => void;
};
export const CreateProcessForm = (props?: Props) => {
  const form = useZodForm(createProcessSchema);
  const router = useRouter();

  const ctx = api.useUtils();
  const { data: templates } = api.processTemplate.findMany.useQuery({});
  const { mutate: createProcess, isPending } = api.process.create.useMutation({
    onSuccess: ({ id }) => {
      props?.onSuccess?.();
      router.push(`/processes/${id}`);
      form.reset();
      void ctx.process.findMany.invalidate();
      toast.success("Успешно!");
    },
    onError: (error) => {
      toast.error(`Возникла ошибка! ${error.message}`);
    },
  });

  const onSubmit = form.handleSubmit((data) => createProcess(data));

  return (
    <MyForm
      form={form}
      onSubmit={onSubmit}
      submitText="Создать"
      isLoading={isPending}
    >
      <MyFormField
        control={form.control}
        name="templateId"
        required
        label="Шаблон"
        description="На основе какого шаблона создать процесс?"
        render={(props) => <MySelect options={templates} by="id" {...props} />}
      />
    </MyForm>
  );
};
