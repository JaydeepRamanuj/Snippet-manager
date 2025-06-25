import CodeEditor from "@/components/CodeEditor";
import NoteEditor from "@/components/NoteEditor";
import { GripHorizontal } from "lucide-react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
function MainPage() {
  return (
    <div className="grow">
      <PanelGroup direction="vertical">
        <Panel>
          <CodeEditor />
        </Panel>
        <PanelResizeHandle className="h-4 bg-gray-500/30 hover:bg-gray-500/40 flex justify-center items-center text-gray-600 hover:text-gray-400 transition-all">
          <GripHorizontal size={12} />
        </PanelResizeHandle>
        <Panel>
          <NoteEditor />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default MainPage;
