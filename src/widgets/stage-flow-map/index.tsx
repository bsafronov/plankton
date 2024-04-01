"use client";

import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export const StageFlowMap = () => {
  return (
    <ReactFlow>
      <Background />
      <Controls />
    </ReactFlow>
  );
};
