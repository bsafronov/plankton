import { PositionList } from "~/entities/position/ui/position-list";
import { CreatePosition } from "~/features/create-position";
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
            title: "Должности",
            href: "/admin/positions",
          },
        ]}
      />
      <div className="space-y-4 p-4">
        <CreatePosition />
        <PositionList />
      </div>
    </>
  );
}
