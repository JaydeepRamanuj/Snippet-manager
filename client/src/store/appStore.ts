import { create } from "zustand";

type SortType = "recency" | "alphabetic";

interface AppState {
  isSidebarCollapsed: boolean;
  isEditingMode: boolean;
  isReadingMode: boolean;
  isLoading: boolean;
  sortType: SortType;
  filteringTags: string[];
  showNewFolderDialog: boolean;
  showNewFileDialog: boolean;
  showAuthDialog: boolean;
  alertDialogMessage: string;

  toggleSidebar: () => void;
  setEditingMode: (value: boolean) => void;
  setReadingMode: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setSortType: (type: SortType) => void;
  setFilteringTags: (tags: string[]) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  setNewFolderDialog: (value: boolean) => void;
  setNewFileDialog: (value: boolean) => void;
  setAuthDialog: (value: boolean) => void;
  setAlertDialogMessage: (str: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarCollapsed: false,
  isEditingMode: false,
  isReadingMode: true,
  isLoading: false,
  showNewFolderDialog: false,
  showNewFileDialog: false,
  showAuthDialog: false,
  sortType: "recency",
  filteringTags: [],
  alertDialogMessage: "",

  toggleSidebar: () =>
    set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
  setEditingMode: (v) => set({ isEditingMode: v }),
  setReadingMode: (v) => set({ isReadingMode: v }),
  setLoading: (v) => set({ isLoading: v }),
  setSortType: (t) => set({ sortType: t }),
  setFilteringTags: (tags) => set({ filteringTags: tags }),
  setNewFolderDialog: (v) => set({ showNewFolderDialog: v }),
  setNewFileDialog: (v) => set({ showNewFileDialog: v }),
  setAuthDialog: (v) => set({ showAuthDialog: v }),
  setAlertDialogMessage: (str) => set({ alertDialogMessage: str }),

  addTag: (tag) =>
    set((s) => ({ filteringTags: [...new Set([...s.filteringTags, tag])] })),
  removeTag: (tag) =>
    set((s) => ({ filteringTags: s.filteringTags.filter((t) => t !== tag) })),
}));
