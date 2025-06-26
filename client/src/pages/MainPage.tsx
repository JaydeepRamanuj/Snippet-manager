import CodeEditor from "@/components/CodeEditor";
import FileTitleBar from "@/components/FileTitleBar";
import NoteEditor from "@/components/NoteEditor";
import { useAuth } from "@clerk/clerk-react";
import { GripHorizontal } from "lucide-react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

function MainPage() {
  const { isLoaded } = useAuth();

  return (
    <div className="h-full flex flex-col">
      <FileTitleBar
        title="useEffect debounce.ts"
        parentFolder="hooks"
        tags={["react", "debounce"]}
        language="TypeScript"
        onDelete={() => console.log("delete snippet")}
      />

      <PanelGroup direction="vertical" className="grow">
        <Panel defaultSize={70} minSize={20}>
          {isLoaded && <CodeEditor />}
        </Panel>
        <PanelResizeHandle className=" my-1 border dark:hover:bg-white/10 hover:bg-black/5 flex justify-center items-center dark:text-gray-600 dark:hover:text-gray-300 transition-all rounded-full">
          <GripHorizontal size={12} />
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={20}>
          <NoteEditor />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default MainPage;
