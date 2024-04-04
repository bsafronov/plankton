import { create } from "zustand";
import {
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import type {
  ProcessTemplateStage,
  ProcessTemplateStageField,
} from "@prisma/client";
import { createSelectors } from "~/shared/lib/zustand";

type Data = ProcessTemplateStage & {
  fields: ProcessTemplateStageField[];
};

type RFState = {
  connectDialog: Connection | null;
  closeConnectDialog: () => void;
  stageIds: ID[];
  nodes: Node<Data>[];
  edges: Edge[];
  getNodes: () => Node[];
  getEdges: () => Edge[];

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onConnectSubmit: (connection: Edge | Connection) => void;

  addNode: (node: Node) => void;
  addNodeField: (stageId: ID, field: ProcessTemplateStageField) => void;
  updateNode: (stageId: ID, data: Partial<Data>) => void;
  updateNodeField: (stageId: ID, data: ProcessTemplateStageField) => void;
  deleteNode: (stageId: ID) => void;
  setNodes: (nodes: Node[]) => void;

  setEdges: (edges: Edge[]) => void;
  deleteEdge: (id: string) => void;
};

const useStageFlowBase = create<RFState>((set, get) => ({
  stageIds: [],
  nodes: [],
  edges: [],
  connectDialog: null,
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
  onConnect: (connection: Connection) => {
    if (connection.sourceHandle?.split("-")[0] === "field") {
      return set({
        connectDialog: connection,
      });
    }

    return get().onConnectSubmit(connection);
  },
  onConnectSubmit: (connection) => {
    console.log(connection);

    set({
      edges: addEdge({ ...connection, type: "stage" }, get().edges),
      connectDialog: null,
    });
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
      stageIds: get().stageIds.filter((v) => v !== id),
      nodes: get().nodes.filter((item) => item.data.id !== id),
      edges: get().edges.filter(
        (item) =>
          item.source !== id.toString() && item.target !== id.toString(),
      ),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
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
