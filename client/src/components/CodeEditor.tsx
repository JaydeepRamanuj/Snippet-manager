import { useTheme } from "@/providers/themeProvider";
import type { SnippetType } from "@/types/snippetType";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
type CodeEditorProps = {
  snippet: SnippetType;
  // handleCodeUpdate: <K extends keyof SnippetType>(
  //   property: K,
  //   value: SnippetType[K]
  // ) => void;
  onChange: (value: string) => void;
};

function CodeEditor({ snippet, onChange }: CodeEditorProps) {
  const handleEditorChange = (updatedCode: string | undefined) => {
    if (!updatedCode) return;
    // handleCodeUpdate("code", editorRef.current.getValue());
    onChange(updatedCode);
  };

  const editorRef = useRef(null);
  // @ts-ignore
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const context = useTheme();

  return (
    <div className="bg-accent h-full rounded-lg p-3 shadow-lg">
      <Editor
        defaultLanguage="javascript"
        language={snippet.language}
        defaultValue="// Namaste World 🙏"
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        value={snippet.code}
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
