import CodeEditor from "@/components/CodeEditor";
import SnippetTitleBar from "@/components/SnippetTitleBar";
import NoteEditor from "@/components/NoteEditor";
import { useAppStore } from "@/store/appStore";
import type { SnippetType } from "@/types/snippetType";
import { useAuth, useUser } from "@clerk/clerk-react";
import { GripHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { useHotkey } from "@/hooks/useHotKeys";
import { SettingsDialog } from "@/components/SettingsDialog";
import showToast from "@/components/common/Toast";

function MainPage() {
  const { getToken, isLoaded } = useAuth();
  const {
    currentSnippet,
    loadedSnippets,
    setCurrentSnippet,
    setLoadedSnippets,
    loadedFolders,
    setAuthDialog,
  } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSnippetDetailsUpdated, setIsSnippetDetailsUpdated] = useState(false);
  const [activeSnippetId, setActiveSnippetId] = useState<string>("");
  const [code, setCode] = useState<string>();
  const [note, setNote] = useState<string>();
  const { user } = useUser();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

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
          `${backendURL}/api/snippets/${currentSnippet._id}`,
          options
        );

        if (response.ok) {
          const result = await response.json();
          setCurrentSnippet(result);
          setActiveSnippetId(result._id);
          setIsLoading(false);
        } else {
          console.log("Error fetching snippets");
          showToast({ msg: "Error fetching snippets", type: "error" });
        }
      } catch (error) {
        console.log("Error getting snippets", error);
        showToast({ msg: "Error fetching snippets", type: "error" });
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

    if (property == "folderName" && value == "Index") {
      const temp = { ...currentSnippet };

      // Remove folderId if folderName is Index
      delete temp.folderId;

      setCurrentSnippet({ ...temp, [property]: value });
    } else {
      const folderId = loadedFolders.find(
        (folder) => folder.name == value
      )?._id;

      // Add folderId if folderName other than Index
      const temp = { ...currentSnippet, folderId: folderId, [property]: value };

      setCurrentSnippet(temp);
    }
  };

  // If snippet is not created but user first add code and then save it
  const createSnippet = async () => {
    if (!user?.id) {
      showToast({ msg: "Please login to add new folder.", type: "info" });
      setAuthDialog(true);
      return;
    }
    const { _id, ...snippetPart } = currentSnippet;

    const newSnippet: Omit<SnippetType, "_id"> = {
      ...snippetPart,
      code: code,
      note: note,
      userId: user?.id,
      lastUpdatedOn: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      createdAt: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      const token = await getToken();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSnippet),
      };

      const response = await fetch(`${backendURL}/api/snippets/`, options);

      if (response.ok) {
        const result = await response.json();
        result.data && showToast({ msg: "Snippet created", type: "success" });

        // console.log("result =>", result);
        setLoadedSnippets([
          ...loadedSnippets,
          { ...newSnippet, _id: result.data },
        ]);
        setIsSnippetDetailsUpdated(false);
      }
    } catch (error) {
      console.log("Error creating snippet", error);
      showToast({ msg: "Error creating snippet", type: "error" });
    }
  };

  // If snippet is already been created
  const saveSnippet = async () => {
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
        `${backendURL}/api/snippets/${currentSnippet._id}`,
        options
      );

      if (response.ok) {
        console.log(response);
        showToast({ msg: "Snippet updated", type: "success" });
        setIsSnippetDetailsUpdated(false);
      } else {
        showToast({ msg: "Error updating snippet, try again.", type: "error" });
      }
    } catch (error) {
      console.log("Error updating snippet, try again.", error);
      showToast({ msg: "Error updating snippet, try again.", type: "error" });
    }
  };

  // Registering keybind to copy code
  useHotkey("Ctrl+Shift+c", () => {
    if (code) {
      window.navigator.clipboard.writeText(code);
      showToast({ msg: "Code copied", type: "info" });
    }
  });

  // Registering keybind to save update snippet
  useHotkey("Ctrl+s", () => {
    currentSnippet._id ? saveSnippet() : createSnippet();
  });

  // console.log("currentSnippet =>", currentSnippet);
  // const handleTagSearch = () => {};

  return (
    <div className="h-full flex flex-col">
      <SnippetTitleBar
        snippet={currentSnippet}
        isUpdated={isSnippetDetailsUpdated}
        handleUpdate={handleSnippetUpdate}
        saveSnippet={saveSnippet}
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
      <SettingsDialog />
    </div>
  );
}

export default MainPage;
