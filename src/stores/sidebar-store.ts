import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = {
  isCollapsed: boolean;
  fold: () => unknown;
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      fold: (): unknown =>
        set((state) => ({ isCollapsed: !state.isCollapsed })),
    }),
    { name: "sidebar" },
  ),
);
