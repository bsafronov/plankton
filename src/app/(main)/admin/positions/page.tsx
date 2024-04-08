import { CreatePositionDialog } from "~/modules/position/ui/create-position/dialog";
import { PositionSearchableList } from "~/modules/position/ui/position-searchable-list";
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
        <CreatePositionDialog />
        <PositionSearchableList />
      </div>
    </>
  );
}
