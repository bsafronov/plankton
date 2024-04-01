"use client";

import { ProcessTemplateFieldList } from "~/entities/process-template/ui/process-template-field-list";
import { CreateProcessTemplateField } from "~/features/create-process-template-field";
import { api } from "~/shared/lib/trpc/react";
import { parseIds } from "~/shared/lib/utils";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

type Props = {
  params: {
    templateId: string;
  };
};

export default function Page({ params }: Props) {
  const { templateId } = parseIds(params);
  const { data: template } =
    api.processTemplate.findUnique.useQuery(templateId);

  return (
    <>
      <MyBreadcrumb
        items={[
          {
            title: "Панель управления",
            href: "/admin",
          },
          {
            title: "Шаблоны",
            href: "/admin/templates",
          },
          {
            title: template?.name,
            href: `/admin/templates/${template?.id}`,
          },
        ]}
      />

      <div className="space-y-4 p-4">
        <CreateProcessTemplateField templateId={templateId} />
        <ProcessTemplateFieldList templateId={templateId} />
      </div>
    </>
  );
}
