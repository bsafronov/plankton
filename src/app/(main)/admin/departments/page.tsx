import { DepartmentList } from "~/entities/department/ui/department-list";
import { CreateDepartment } from "~/features/create-department";
import { links } from "~/modules/_app/lib/links";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

export default function Page() {
  return (
    <>
      <MyBreadcrumb
        items={[links.adminPanel.index, links.adminPanel.departments.index]}
      />
      <div className="space-y-4 p-4">
        <CreateDepartment />
        <DepartmentList />
      </div>
    </>
  );
}
