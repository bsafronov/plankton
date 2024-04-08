import { DeleteProcessDialog } from "~/modules/process/ui/delete-process/dialog";
import { parseIds } from "~/shared/lib/utils";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

type Props = {
  params: {
    processId: string;
  };
};

export default function Page({ params }: Props) {
  const { processId } = parseIds(params);

  return (
    <div>
      <MyBreadcrumb
        items={[
          {
            title: "Процессы",
            href: "/processes",
          },
          {
            title: processId,
            href: `/processes/${processId}`,
          },
        ]}
      />
      <div className="space-y-2 p-4">
        <DeleteProcessDialog processId={processId} />
      </div>
    </div>
  );
}
