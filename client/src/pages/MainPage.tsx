import CodeEditor from "@/components/CodeEditor";
import FileTitleBar from "@/components/FileTitleBar";
import NoteEditor from "@/components/NoteEditor";
import { isLanguage } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import type { SnippetType } from "@/types/snippetType";
import { useAuth } from "@clerk/clerk-react";
import { GripHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

function MainPage() {
  const { getToken, isLoaded } = useAuth();
  const { currentSnippet, loadedSnippets } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [snippet, setSnippet] = useState<SnippetType>({
    _id: "",
    createdAt: "",
    language: "javascript",
    lastUpdatedOn: "",
    title: "New File",
    userId: "",
    code: "",
    folderId: "",
    folderName: "",
    note: "",
    tags: [],
  });

  useEffect(() => {
    const fetchSnippets = async () => {
      setIsLoading(true);
      const token = await getToken();
      try {
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        setIsLoading(true);
        const response = await fetch(
          `/api/snippets/${currentSnippet}`,
          options
        );

        if (response.ok) {
          const result = await response.json();
          // console.log("result =>", result);
          setSnippet(result);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error getting snippets", error);
        setIsLoading(false);
      }
    };

    // console.log("currentSnippet =>", currentSnippet);

    if (isLoaded && loadedSnippets.length > 0) {
      fetchSnippets();
    }
  }, [currentSnippet]);

  const handleNoteChange = (value: string) => {
    setSnippet((prev) => ({ ...prev, note: value }));
  };

  const handleCodeUpdate = (value: string) => {
    setSnippet((prev) => ({ ...prev, code: value }));
  };

  // const handleLanguageUpdate = (value: string) => {
  //   setSnippet((prev) => ({
  //     ...prev,
  //     language: isLanguage(value) ? value : "javascript",
  //   }));
  // };

  return (
    <div className="h-full flex flex-col">
      <FileTitleBar snippet={snippet} />

      <PanelGroup direction="vertical" className="grow">
        <Panel defaultSize={70} minSize={20}>
          {isLoaded && (
            <CodeEditor snippet={snippet} handleCodeUpdate={handleCodeUpdate} />
          )}
        </Panel>
        <PanelResizeHandle className=" my-1 border dark:hover:bg-white/10 hover:bg-black/5 flex justify-center items-center dark:text-gray-600 dark:hover:text-gray-300 transition-all rounded-full">
          <GripHorizontal size={12} />
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={20}>
          <NoteEditor
            snippet={snippet}
            handleNoteChange={handleNoteChange}
            isLoading={isLoading}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default MainPage;
