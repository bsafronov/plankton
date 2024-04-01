import { create } from "zustand";

type Props = {
  stageId: ID | null;
  setStageId: (stageId: ID | null) => void;
};

export const useSelectedStage = create<Props>()((set) => ({
  stageId: null,
  setStageId: (stageId) => set({ stageId }),
}));
