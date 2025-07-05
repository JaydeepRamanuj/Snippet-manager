import CodeEditor from "@/components/CodeEditor";
import SnippetTitleBar from "@/components/SnippetTitleBar";
import NoteEditor from "@/components/NoteEditor";
import { useAppStore } from "@/store/appStore";
import type { SnippetType } from "@/types/snippetType";
import { useAuth } from "@clerk/clerk-react";
import { GripHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { useHotkey } from "@/hooks/useHotKeys";
import { toast } from "sonner";

function MainPage() {
  const { getToken, isLoaded } = useAuth();
  const { currentSnippet, loadedSnippets, setCurrentSnippet } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSnippetDetailsUpdated, setIsSnippetDetailsUpdated] = useState(false);
  const [activeSnippetId, setActiveSnippetId] = useState<string>("");
  const [code, setCode] = useState<string>();
  const [note, setNote] = useState<string>();
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
          `/api/snippets/${currentSnippet._id}`,
          options
        );

        if (response.ok) {
          const result = await response.json();
          setCurrentSnippet(result);
          setActiveSnippetId(result._id);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error getting snippets", error);
        setIsLoading(false);
      }
    };

    // console.log("currentSnippet =>", currentSnippet);

    if (isLoaded && currentSnippet._id != activeSnippetId) {
      fetchSnippets();
    }
  }, [currentSnippet]);

  const handleNoteChange = (note: string) => {
    setIsSnippetDetailsUpdated(true);
    setNote(note);
  };

  const handleCodeChange = (code: string) => {
    setIsSnippetDetailsUpdated(true);
    setCode(code);
  };

  // This function will handle all property updates
  // Language and tags has special changes which I have added in if-else

  // In this function I want only valid property and value
  // To achieve this, I'm using 'Key-value dependent types'.
  // That is a TypeScript pattern ensures that when a property key is passed to a function, the value provided must match the corresponding type of that key in an interface / type.
  // Read more in notes

  const handleSnippetUpdate = <K extends keyof SnippetType>(
    property: K,
    value: SnippetType[K]
  ) => {
    setIsSnippetDetailsUpdated(true);
    if (currentSnippet[property] === value) return;

    console.log("value =>", value);
    if (property == "folderId" && value == "remove") {
      const temp = { ...currentSnippet };
      delete temp.folderId;
      setCurrentSnippet(temp);
    } else {
      setCurrentSnippet({ ...currentSnippet, [property]: value });
    }
  };

  // Registering keybind to save update snippet
  useHotkey("Ctrl+s", async () => {
    console.log("updating snippet");
    try {
      const token = await getToken();
      console.log({ ...currentSnippet, code: code, note: note });
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...currentSnippet, code: code, note: note }),
      };
      console.log("currentSnippet._id =>", currentSnippet._id);
      const response = await fetch(
        `/api/snippets/${currentSnippet._id}`,
        options
      );

      if (response.ok) {
        console.log(response);
        toast.success("Snippet updated");
        setIsSnippetDetailsUpdated(false);
      } else {
        toast.error("Error updating snippet, try again.");
      }
    } catch (error) {
      console.log("Error updating snippet, try again.", error);
      toast.error("Error updating snippet, try again.");
    }
  });
  // console.log("currentSnippet =>", currentSnippet);
  const handleTagSearch = () => {};

  return (
    <div className="h-full flex flex-col">
      <SnippetTitleBar
        snippet={currentSnippet}
        isUpdated={isSnippetDetailsUpdated}
        handleUpdate={handleSnippetUpdate}
      />

      <PanelGroup direction="vertical" className="grow">
        <Panel defaultSize={70} minSize={20}>
          {isLoaded && (
            <CodeEditor snippet={currentSnippet} onChange={handleCodeChange} />
          )}
        </Panel>
        <PanelResizeHandle className=" my-1 border dark:hover:bg-white/10 hover:bg-black/5 flex justify-center items-center dark:text-gray-600 dark:hover:text-gray-300 transition-all rounded-full">
          <GripHorizontal size={12} />
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={20}>
          <NoteEditor
            snippet={currentSnippet}
            onChange={handleNoteChange}
            isLoading={isLoading}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default MainPage;
