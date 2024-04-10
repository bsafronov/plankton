import { links } from "~/modules/_app/lib/links";
import { ProcessStageFormData } from "~/modules/process/ui/process-stage-form/data";
import { ProcessTabs } from "~/modules/process/ui/process-tabs";
import { parseIds } from "~/shared/lib/utils";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

type Props = {
  params: {
    processId: string;
  };
};

export default async function Page({ params }: Props) {
  const { processId } = parseIds(params);

  return (
    <div className="flex min-h-screen flex-col">
      <MyBreadcrumb
        items={[
          links.processes.index,
          links.processes.id(processId, processId),
        ]}
      />
      <div className="flex grow divide-x">
        <div className="grow space-y-4 p-4">
          <div className="rounded-md border p-4">
            <ProcessStageFormData processId={processId} />
          </div>
          <ProcessTabs />
          {/* <DeleteProcessDialog processId={processId} /> */}
        </div>
        <div className="min-w-60 p-4"></div>
      </div>
    </div>
  );
}
