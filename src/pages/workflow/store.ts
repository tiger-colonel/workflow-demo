import { useContext } from 'react';
import { useStore as useZustandStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import type { Viewport } from 'reactflow';
import { Node, Edge } from './types';
import { WorkflowContext } from './context';

type Shape = {
  backupDraft?: {
    nodes: Node[];
    edges: Edge[];
    viewport: Viewport;
  };
  setBackupDraft: (backupDraft?: Shape['backupDraft']) => void;
};
export const createWorkflowStore = () => {
  return createStore<Shape>((set) => ({
    backupDraft: undefined,
    setBackupDraft: (backupDraft) => set(() => ({ backupDraft })),
  }));
};

export function useStore<T>(selector: (state: Shape) => T): T {
  const store = useContext(WorkflowContext);
  if (!store) throw new Error('Missing WorkflowContext.Provider in the tree');

  return useZustandStore(store, selector);
}

export const useWorkflowStore = () => {
  return useContext(WorkflowContext)!;
};
