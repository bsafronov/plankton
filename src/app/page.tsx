"use client";

import { api } from "~/shared/lib/trpc/react";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return <div className="m-2 flex flex-col p-2">{hello.data?.greeting}</div>;
}
