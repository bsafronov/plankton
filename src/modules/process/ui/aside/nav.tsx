import { ProcessAsideList } from "./list";
import { CreateProcessDialog } from "../create-process-dialog";

export const ProcessAsideNav = () => {
  return (
    <aside className="min-h-screen min-w-48 max-w-48 border-r">
      <div className="sticky flex h-screen flex-col">
        <div className="border-b px-4 py-2 text-sm">Активные процессы</div>
        <div className="flex grow flex-col">
          <div className="flex flex-col text-sm">
            <ProcessAsideList />
          </div>
          <div className="flex justify-center px-4 py-2">
            <CreateProcessDialog />
          </div>
        </div>
      </div>
    </aside>
  );
};
