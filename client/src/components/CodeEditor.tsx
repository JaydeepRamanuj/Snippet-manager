import { useHotkey } from "@/hooks/useHotKeys";
import { useTheme } from "@/providers/themeProvider";
import Editor from "@monaco-editor/react";

import { useEffect, useState } from "react";

function CodeEditor() {
  const [code, setCode] = useState<string>("");

  const handleEditorChange = (updatedCode: string | undefined) => {
    if (!updatedCode) return;
    console.log(updatedCode);
    setCode(updatedCode);
  };

  const context = useTheme();
  useHotkey("Ctrl+s", () => console.log("Save snippet"));
  return (
    <div className="p-3 h-full rounded-lg shadow-lg bg-accent">
      <Editor
        defaultLanguage="javascript"
        defaultValue="// Namaste World"
        onChange={handleEditorChange}
        theme={context.theme == "dark" ? "vs-dark" : "light"}
        options={{
          // readOnly: true,
          minimap: { enabled: true },
        }}
      />
    </div>
  );
}

export default CodeEditor;
