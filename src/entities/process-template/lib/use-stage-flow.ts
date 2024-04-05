import type {
  ProcessTemplateStage,
  ProcessTemplateStageField,
} from "@prisma/client";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type OnEdgesChange,
  type OnNodesChange,
} from "reactflow";
import { create } from "zustand";
import { createSelectors } from "~/shared/lib/zustand";

export type StageNodeData = Partial<ProcessTemplateStage> & {
  fields: ProcessTemplateStageField[];
};

type RFState = {
  connectDialog: Connection | Edge | null;
  setConnectDialog: (connection: Connection | Edge | null) => void;
  closeConnectDialog: () => void;
  stageIds: ID[];
  nodes: Node<StageNodeData>[];
  edges: Edge[];
  getNodes: () => Node[];
  getEdges: () => Edge[];

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Edge | Connection) => void;
  addNode: (node: Node) => void;
  addNodeField: (stageId: ID, field: ProcessTemplateStageField) => void;
  updateNode: (stageId: ID, data: Partial<StageNodeData>) => void;
  updateNodeField: (stageId: ID, data: ProcessTemplateStageField) => void;
  deleteNode: (id: string) => void;
  setNodes: (nodes: Node[]) => void;

  setEdges: (edges: Edge[]) => void;
  deleteEdge: (id: string) => void;
};

const useStageFlowBase = create<RFState>((set, get) => ({
  stageIds: [],
  nodes: [],
  edges: [],
  connectDialog: null,
  setConnectDialog: (connection) => {
    set({
      connectDialog: connection,
    });
  },
  closeConnectDialog: () => {
    set({
      connectDialog: null,
    });
  },
  getNodes: () => {
    return get().nodes;
  },
  getEdges: () => {
    return get().edges;
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection | Edge) => {
    set({
      edges: addEdge({ ...connection, type: "stage" }, get().edges),
      connectDialog: null,
    });
    console.log(get().edges);
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
      stageIds: [...get().stageIds, Number(node.id)],
    });
  },
  addNodeField: (stageId, field) => {
    set({
      nodes: get().nodes.map((item) => {
        if (item.data.id !== stageId) {
          return item;
        }

        return {
          ...item,
          data: {
            ...item.data,
            fields: [...item.data.fields, field],
          },
        };
      }),
    });
  },
  updateNode: (stageId, stage) => {
    set({
      nodes: get().nodes.map((item) => {
        if (item.data.id !== stageId) {
          return item;
        }

        return {
          ...item,
          data: {
            ...item.data,
            ...stage,
          },
        };
      }),
    });
  },
  updateNodeField: (id, data) => {
    set({
      nodes: get().nodes.map((item) => {
        if (item.data.id !== id) {
          return item;
        }

        return {
          ...item,
          data: {
            ...item.data,
            fields: item.data.fields.map((field) => {
              if (field.id === data.id) {
                return data;
              }

              return field;
            }),
          },
        };
      }),
    });
  },
  deleteNode: (id) => {
    set({
      stageIds: get().stageIds.filter((v) => v !== Number(id)),
      nodes: get().nodes.filter((item) => item.id !== id),
      edges: get().edges.filter(
        (item) => item.source !== id && item.target !== id,
      ),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes, stageIds: nodes.map((node) => Number(node.id)) });
  },

  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  deleteEdge: (id) => {
    set({
      edges: get().edges.filter((v) => v.id !== id),
    });
  },
}));

export const useStageFlow = createSelectors(useStageFlowBase);
