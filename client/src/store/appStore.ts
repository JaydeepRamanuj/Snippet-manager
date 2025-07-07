import type { FolderType } from "@/types/folderType";
import type { SnippetType } from "@/types/snippetType";
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
  showSearchDialog: boolean;
  showSettingsDialog: boolean;
  alertDialogMessage: string;
  currentSnippet: SnippetType;
  currentFolder: string;
  loadedSnippets: SnippetType[];
  loadedFolders: FolderType[];
  sideBarWidth: number;
  recentSnippets: string[];
  currentSettingsTab: string;

  toggleSidebar: () => void;
  setEditingMode: (value: boolean) => void;
  setReadingMode: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setSearchDialog: (value: boolean) => void;
  setSortType: (type: SortType) => void;
  setFilteringTags: (tags: string[]) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  setNewFolderDialog: (value: boolean) => void;
  setNewFileDialog: (value: boolean) => void;
  setAuthDialog: (value: boolean) => void;
  setAlertDialogMessage: (str: string) => void;
  setCurrentSnippet: (snippet: SnippetType) => void;
  setCurrentFolder: (snippetId: string) => void;
  setLoadedSnippets: (snippets: SnippetType[]) => void;
  setLoadedFolders: (folders: FolderType[]) => void;
  setSideBarWidth: (value: number) => void;
  addToRecentSnippets: (value: string) => void;
  setSettingsDialog: (value: boolean) => void;
  setCurrentSettingsTab: (value: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarCollapsed: false,
  isEditingMode: false,
  isReadingMode: true,
  isLoading: false,
  showNewFolderDialog: false,
  showNewFileDialog: false,
  showAuthDialog: false,
  showSearchDialog: false,
  showSettingsDialog: false,
  sortType: "recency",
  filteringTags: [],
  alertDialogMessage: "",
  currentSnippet: {
    _id: "",
    createdAt: "",
    language: "javascript",
    lastUpdatedOn: "",
    title: "Untitled",
    userId: "",
    code: "// Namaste World 🙏",
    folderName: "Index",
    note: "<p>Write your comments here...</p>",
    tags: [],
  },
  currentFolder: "index",
  loadedSnippets: [],
  loadedFolders: [
    {
      _id: "index",
      name: "Index",
      userId: "app",
    },
  ],
  sideBarWidth: 500,
  recentSnippets: [],
  currentSettingsTab: "account",

  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setEditingMode: (value) => set({ isEditingMode: value }),
  setReadingMode: (value) => set({ isReadingMode: value }),
  setLoading: (value) => set({ isLoading: value }),
  setSortType: (type) => set({ sortType: type }),
  setSearchDialog: (value) => set({ showSearchDialog: value }),
  setFilteringTags: (tags) => set({ filteringTags: tags }),
  setNewFolderDialog: (value) => set({ showNewFolderDialog: value }),
  setNewFileDialog: (value) => set({ showNewFileDialog: value }),
  setAuthDialog: (value) => set({ showAuthDialog: value }),
  setSettingsDialog: (value) => set({ showSettingsDialog: value }),
  setAlertDialogMessage: (str) => set({ alertDialogMessage: str }),
  setCurrentSnippet: (snippet) => set({ currentSnippet: snippet }),
  setCurrentFolder: (folderId) => set({ currentFolder: folderId }),
  setLoadedSnippets: (snippets) => set({ loadedSnippets: snippets }),
  setLoadedFolders: (folders) => set({ loadedFolders: folders }),
  setSideBarWidth: (value) => set({ sideBarWidth: value }),
  setCurrentSettingsTab: (value) => set({ currentSettingsTab: value }),
  addTag: (tag) =>
    set((state) => ({
      filteringTags: [...new Set([...state.filteringTags, tag])],
    })),
  removeTag: (tag) =>
    set((state) => ({
      filteringTags: state.filteringTags.filter((t) => t !== tag),
    })),
  addToRecentSnippets: (value) =>
    set((state) => {
      const recent10Snippets = [
        ...new Set([value, ...state.recentSnippets]),
      ].slice(0, 10);
      return {
        recentSnippets: recent10Snippets,
      };
    }),
}));
