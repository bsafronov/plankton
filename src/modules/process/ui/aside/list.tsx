import { api } from "~/shared/lib/trpc/server";
import { ProcessAsideItem } from "./item";

export const ProcessAsideList = async () => {
  const processes = await api.process.findMany();

  if (!!!processes.length) {
    return (
      <p className="border-b px-4 py-2 text-center text-muted-foreground">
        Активных процессов не найдено
      </p>
    );
  }

  return (
    <div className="border-b">
      {processes.map((item) => (
        <ProcessAsideItem key={item.id} process={item} />
      ))}
    </div>
  );
};
