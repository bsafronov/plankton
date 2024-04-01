import { EnumList } from "~/entities/enum/ui/enum-list";
import { CreateEnum } from "~/features/create-enum";
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
        <CreateEnum />
        <EnumList />
      </div>
    </>
  );
}
