import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Theme } from "@/types/theme.ts";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => unknown;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: (): unknown =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    { name: "theme" },
  ),
);
