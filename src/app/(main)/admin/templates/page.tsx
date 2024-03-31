import { ProcessTemplateList } from "~/entities/process-template/ui/process-template-list";
import { CreateProcessTemplate } from "~/features/create-process-template";
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
            title: "Шаблоны",
            href: "/admin/templates",
          },
        ]}
      />
      <div className="p-4">
        <CreateProcessTemplate />
        <div className="mt-4">
          <ProcessTemplateList />
        </div>
      </div>
    </>
  );
}
