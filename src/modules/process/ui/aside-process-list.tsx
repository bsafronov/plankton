import { api } from "~/shared/lib/trpc/server";
import { AsideProcessItem } from "./aside-process-item";

export const AsideProcessList = async () => {
  const processes = await api.process.findMany();

  return (
    <div className="border-b">
      {processes.map((item) => (
        <AsideProcessItem key={item.id} process={item} />
      ))}
    </div>
  );
};
