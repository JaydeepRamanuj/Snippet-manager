import { useHotkey } from "@/hooks/useHotKeys";
import Editor from "@monaco-editor/react";
import { useState } from "react";

function CodeEditor() {
  const [code, setCode] = useState<string>("");

  const handleEditorChange = (updatedCode: string | undefined) => {
    if (!updatedCode) return;
    console.log(updatedCode);
    setCode(updatedCode);
  };

  useHotkey("Ctrl+s", () => console.log("Save snippet"));
  return (
    <div className="h-screen p-3 rounded-lg shadow-lg bg-accent">
      <Editor
        defaultLanguage="javascript"
        defaultValue="// Namaste World"
        onChange={handleEditorChange}
        theme="vs-dark"
        // theme="adromeda"
        options={{
          // readOnly: true,
          minimap: { enabled: true },
        }}
      />
    </div>
  );
}

export default CodeEditor;
