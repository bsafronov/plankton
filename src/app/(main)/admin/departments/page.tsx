import { DepartmentList } from "~/entities/department/ui/department-list";
import { CreateDepartment } from "~/features/create-department";
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
            title: "Отделы",
            href: "/admin/departments",
          },
        ]}
      />
      <div className="space-y-4 p-4">
        <CreateDepartment />
        <DepartmentList />
      </div>
    </>
  );
}
