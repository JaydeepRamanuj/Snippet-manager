import { SimpleEditor } from "./tiptap/tiptap-templates/simple/simple-editor";
import type { SnippetType } from "@/types/snippetType";

type NoteEditorProps = {
  snippet: SnippetType;
  isLoading: boolean;
  // handleNoteChange: <K extends keyof SnippetType>(
  //   property: K,
  //   value: SnippetType[K]
  // ) => void;

  onChange: (value: string) => void;
};

function NoteEditor({ snippet, isLoading, onChange }: NoteEditorProps) {
  const handleChange = (value: string | object) => {
    if (typeof value === "string") {
      // handleNoteChange("note", value);
      onChange(value);
    }
  };
  return (
    <div className="h-full">
      <SimpleEditor
        outputType="html"
        isEditable={true}
        value={
          isLoading
            ? "<p>Loading... Please wait.</p>"
            : snippet.note || "<p>Write your comments here...</p>"
        }
        onChange={handleChange}
      />
    </div>
  );
}
export default NoteEditor;
