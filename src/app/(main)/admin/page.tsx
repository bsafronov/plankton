import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";
import { AdminEntitySettingsList } from "~/widgets/admin-entity-settings-list";

export default function Page() {
  return (
    <>
      <MyBreadcrumb
        items={[
          {
            title: "Панель управления",
            href: "/admin",
          },
        ]}
      />
      <div className="p-4">
        <AdminEntitySettingsList />
      </div>
    </>
  );
}
