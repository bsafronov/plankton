"use client";

import Link from "next/link";
import { type api } from "~/shared/lib/trpc/server";

type Props = {
  process: Awaited<ReturnType<typeof api.process.findMany>>[0];
};

export const ProcessAsideItem = ({ process }: Props) => {
  return (
    <Link
      href={`/processes/${process.id}`}
      className="flex flex-wrap items-baseline gap-2 px-4 py-1.5 text-sm hover:bg-muted/50"
    >
      Изделие 1{" "}
      <span className="text-xs text-muted-foreground">
        #{process.currentStage?.templateStage.name}
      </span>
    </Link>
  );
};
