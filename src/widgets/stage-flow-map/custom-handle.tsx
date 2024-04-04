"use client";

import { type ComponentPropsWithoutRef, useEffect } from "react";
import { Handle, useUpdateNodeInternals } from "reactflow";

type Props = ComponentPropsWithoutRef<typeof Handle> & {
  nodeId: string | string[];
};

export const CustomHandle = ({ nodeId, ...props }: Props) => {
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(nodeId);
  }, [updateNodeInternals, nodeId]);

  return <Handle {...props} />;
};
