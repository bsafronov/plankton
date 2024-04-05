"use client";

import { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  type EdgeTypes,
  type NodeTypes,
  type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
import { StageEdge } from "./stage-edge";
import { StageNode } from "./stage-node";
import { useStageOnDrop } from "./use-stage-on-drag";
import { useOnNodesChange } from "./use-on-nodes-change";
import { useOnConnect } from "./use-on-connect";
import { useInitFlowMap } from "./use-init-flow-map";

export const StageFlowMap = () => {
  useInitFlowMap();
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const { onDrop, onDragOver } = useStageOnDrop(reactFlowInstance);
  const onNodesChange = useOnNodesChange();
  const { onConnect } = useOnConnect();
  const edgeTypes: EdgeTypes = useMemo(() => ({ stage: StageEdge }), []);
  const nodeTypes: NodeTypes = useMemo(() => ({ stage: StageNode }), []);
  const nodes = useStageFlow.use.nodes();
  const edges = useStageFlow.use.edges();
  const onEdgesChange = useStageFlow.use.onEdgesChange();

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      onDragOver={onDragOver}
      onDrop={onDrop}
      fitView
      isValidConnection={(connection) =>
        connection.sourceHandle?.split("-")[1] !==
        connection.targetHandle?.split("-")[1]
      }
    >
      <Panel
        position="top-left"
        className="rounded-md border bg-background p-2 text-sm"
      >
        <div className="flex items-center">
          <div className="size-3 rounded-full bg-amber-400" />
          &nbsp; - Вход
        </div>
        <div className="flex items-center">
          <div className="size-3 rounded-full bg-emerald-400" />
          &nbsp; - Выход
        </div>
      </Panel>
      <Background />
      <Controls />
      <MiniMap
        pannable
        zoomable
        className="rounded-md border"
        nodeColor={"orange"}
      />
    </ReactFlow>
  );
};
