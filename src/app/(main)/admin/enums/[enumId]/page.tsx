"use client";

import { EnumItemList } from "~/entities/enum/ui/enum-item-list";
import { CreateEnumItem } from "~/features/create-enum-item";
import { api } from "~/shared/lib/trpc/react";
import { parseIds } from "~/shared/lib/utils";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

type Props = {
  params: {
    enumId: string;
  };
};

export default function Page({ params }: Props) {
  const { enumId } = parseIds(params);

  const { data } = api.enum.findUnique.useQuery(enumId);

  return (
    <>
      <MyBreadcrumb
        items={[
          {
            title: "Панель управления",
            href: "/admin",
          },
          {
            title: "Перечисления",
            href: "/admin/enums",
          },
          {
            title: data?.name,
            href: `/admin/enums/${data?.id}`,
          },
        ]}
      />

      <div className="space-y-4 p-4">
        <CreateEnumItem enumId={enumId} />
        <EnumItemList enumId={enumId} />
      </div>
    </>
  );
}
