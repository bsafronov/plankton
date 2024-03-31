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
    </>
  );
}
