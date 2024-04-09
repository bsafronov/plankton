import { links } from "~/modules/_app/lib/links";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

export default function Page() {
  return (
    <div>
      <MyBreadcrumb items={[links.processes.index]} />
    </div>
  );
}
