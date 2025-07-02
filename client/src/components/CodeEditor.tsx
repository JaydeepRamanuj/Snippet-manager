import { useHotkey } from "@/hooks/useHotKeys";
import { useTheme } from "@/providers/themeProvider";
import { useAppStore } from "@/store/appStore";
import type { SnippetType } from "@/types/snippetType";
import Editor from "@monaco-editor/react";

import { useEffect } from "react";

type CodeEditorProps = {
  snippet: SnippetType;
  handleCodeUpdate: (value: string) => void;
};

function CodeEditor({ snippet, handleCodeUpdate }: CodeEditorProps) {
  // const {
  //   currentSnippet,
  //   loadedSnippets,
  //   currentSnippetCode,
  //   setCurrentSnippetCode,
  //   currentSnippetLanguage,
  //   setCurrentSnippetLanguage,
  // } = useAppStore();
  // let snippetCode = "// Namaste World 🙏";
  // let snippetLanguage = "javascript";

  // useEffect(() => {
  //   if (typeof currentSnippet === "string") {
  //     const snippet = loadedSnippets.find(
  //       (snippet) => snippet._id == currentSnippet
  //     );
  //     snippetCode = snippet?.code || "// Namaste World 🙏";
  //     snippetLanguage = snippet?.language || "javascript";
  //   } else {
  //     snippetCode = currentSnippet.code || "// Namaste World 🙏";
  //   }

  //   setCurrentSnippetCode(snippetCode);
  //   setCurrentSnippetLanguage(snippetLanguage);
  // }, [currentSnippet]);

  const handleEditorChange = (updatedCode: string | undefined) => {
    if (!updatedCode) return;
    handleCodeUpdate(updatedCode);
  };

  const context = useTheme();
  useHotkey("Ctrl+s", () => console.log("Save snippet"));

  return (
    <div className="p-3 h-full rounded-lg shadow-lg bg-accent">
      <Editor
        defaultLanguage="javascript"
        language={snippet.language}
        value={snippet.code}
        defaultValue="// Namaste World 🙏"
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
