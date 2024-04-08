"use client";

import { EndNodeList } from "./end-node-list";
import { StartNode } from "./start-node";

type Props = {
  templateId: ID;
};
export const BorderingStages = ({ templateId }: Props) => {
  return (
    <div className="space-y-2 rounded-md border p-3">
      <StartNode templateId={templateId} />
      <EndNodeList templateId={templateId} />
    </div>
  );
};
