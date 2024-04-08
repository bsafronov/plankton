import { api } from "~/shared/lib/trpc/server";
import { ProcessAsideItem } from "./item";

export const ProcessAsideList = async () => {
  const processes = await api.process.findMany();

  return (
    <div className="border-b">
      {processes.map((item) => (
        <ProcessAsideItem key={item.id} process={item} />
      ))}
    </div>
  );
};
