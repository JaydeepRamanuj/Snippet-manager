import { create } from "zustand";

interface Snippet {
  id: string;
  title: string;
  language: string;
  tags: string[];
  code: string;
  note: string;
  createdAt: Date;
  lastUpdated: Date;
}

interface SnippetStore {
  snippets: Snippet[];
  activeSnippetId: string | null;

  setSnippets: (s: Snippet[]) => void;
  addSnippet: (s: Snippet) => void;
  updateSnippet: (s: Snippet) => void;
  deleteSnippet: (id: string) => void;
  setActiveSnippet: (id: string | null) => void;
}

export const useSnippetStore = create<SnippetStore>((set) => ({
  snippets: [],
  activeSnippetId: null,

  setSnippets: (snippets) => set({ snippets }),
  addSnippet: (s) => set((state) => ({ snippets: [s, ...state.snippets] })),
  updateSnippet: (updated) =>
    set((state) => ({
      snippets: state.snippets.map((s) => (s.id === updated.id ? updated : s)),
    })),
  deleteSnippet: (id) =>
    set((state) => ({
      snippets: state.snippets.filter((s) => s.id !== id),
    })),
  setActiveSnippet: (id) => set({ activeSnippetId: id }),
}));
