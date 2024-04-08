import { CreateEnumDialog } from "~/modules/enum/ui/create-enum/dialog";
import { EnumSearchableList } from "~/modules/enum/ui/searchable-list";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

export default function Page() {
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
        ]}
      />

      <div className="space-y-4 p-4">
        <CreateEnumDialog />
        <EnumSearchableList />
      </div>
    </>
  );
}
