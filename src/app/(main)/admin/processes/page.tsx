import Link from "next/link";
import { api } from "~/shared/lib/trpc/server";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

export default async function Page() {
  const processes = await api.process.findMany();

  return (
    <>
      <MyBreadcrumb
        items={[
          {
            title: "Панель управления",
            href: "/admin",
          },
          {
            title: "Процессы",
            href: "/admin/processes/",
          },
        ]}
      />
      <div className="flex gap-2 p-4">
        {processes.map((item) => (
          <Link key={item.id} href={`/admin/processes/${item.id}`}>
            <div className="rounded-md border p-4 text-sm">
              {item.product.name}{" "}
              <span className="text-muted-foreground">
                #{item.currentStage?.templateStage.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
