import { AsideProcessList } from "./aside-process-list";
import { CreateProcessDialog } from "./create-process-dialog";

export const AsideProcessNav = () => {
  return (
    <aside className="min-h-screen min-w-48 border-r">
      <div className="sticky flex h-screen flex-col">
        <div className="border-b px-4 py-2 text-sm">Активные процессы</div>
        <div className="flex grow flex-col justify-between">
          <div className="flex flex-col text-sm">
            <AsideProcessList />
          </div>
          <div className="flex justify-center px-4">
            <CreateProcessDialog />
          </div>
        </div>
      </div>
    </aside>
  );
};
