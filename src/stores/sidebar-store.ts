import { create } from "zustand";

type SidebarState = {
  isCollapsed: boolean;
  fold: () => void;
};

export const useSidebarStore = create<SidebarState>()((set) => ({
  isCollapsed: false,
  fold: (): void => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
