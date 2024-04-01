"use client";

import { api } from "~/shared/lib/trpc/react";
import { parseIds } from "~/shared/lib/utils";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";
import { StageFlowMap } from "~/widgets/stage-flow-map";
import { StageFlowSettings } from "~/widgets/stage-flow-settings";

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
    <div className="flex h-full flex-col">
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
          {
            title: "Схема",
          },
        ]}
      />
      <div className="flex grow divide-x">
        <StageFlowMap />
        <StageFlowSettings templateId={templateId} />
      </div>
    </div>
  );
}
