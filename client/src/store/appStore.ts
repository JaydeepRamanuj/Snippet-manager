import { create } from "zustand";

type SortType = "recency" | "alphabetic";

interface appState {
  isSidebarCollapsed: boolean;
  isEditingMode: boolean;
  isReadingMode: boolean;
  isLoading: boolean;
  sortType: SortType;
  filteringTags: string[];

  toggleSidebar: () => void;
  setEditingMode: (value: boolean) => void;
  setReadingMode: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setSortType: (type: SortType) => void;
  setFilteringTags: (tags: string[]) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export const appStore = create<appState>((set) => ({
  isSidebarCollapsed: false,
  isEditingMode: false,
  isReadingMode: true,
  isLoading: false,
  sortType: "recency",
  filteringTags: [],

  toggleSidebar: () =>
    set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
  setEditingMode: (v) => set({ isEditingMode: v }),
  setReadingMode: (v) => set({ isReadingMode: v }),
  setLoading: (v) => set({ isLoading: v }),
  setSortType: (t) => set({ sortType: t }),
  setFilteringTags: (tags) => set({ filteringTags: tags }),
  addTag: (tag) =>
    set((s) => ({ filteringTags: [...new Set([...s.filteringTags, tag])] })),
  removeTag: (tag) =>
    set((s) => ({ filteringTags: s.filteringTags.filter((t) => t !== tag) })),
}));
