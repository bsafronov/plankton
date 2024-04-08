import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

export default function Page() {
  return (
    <div>
      <MyBreadcrumb
        items={[
          {
            title: "Процессы",
          },
        ]}
      />
    </div>
  );
}
