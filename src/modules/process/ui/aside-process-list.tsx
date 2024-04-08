import Link from "next/link";
import { Button } from "~/shared/ui/button";

export const AsideProcessList = () => {
  return (
    <div className="min-h-screen min-w-48 border-r">
      <div className="sticky flex h-screen flex-col">
        <div className="border-b px-4 py-2 text-sm">Активные процессы</div>
        <div className="flex grow flex-col justify-between px-4 py-2">
          <div className="flex flex-col text-sm">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>
                <Link href={`/processes/${i + 1}`}>Процесс {i + 1}</Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button>Создать процесс</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
