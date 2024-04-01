"use client";

import { api } from "~/shared/lib/trpc/react";
import { parseIds } from "~/shared/lib/utils";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

type Props = {
  params: {
    positionId: string;
  };
};

export default function Page({ params }: Props) {
  const { positionId } = parseIds(params);

  const { data } = api.position.findUnique.useQuery(positionId);

  return (
    <>
      <MyBreadcrumb
        items={[
          {
            title: "Панель управления",
            href: "/admin",
          },
          {
            title: "Должности",
            href: "/admin/positions",
          },
          {
            title: data?.name,
            href: `/admin/positions/${data?.id}`,
          },
        ]}
      />
    </>
  );
}
