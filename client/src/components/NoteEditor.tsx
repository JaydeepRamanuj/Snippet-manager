import { useEffect, useState } from "react";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import { useAppStore } from "@/store/appStore";
import type { SnippetType } from "@/types/snippetType";

type NoteEditorProps = {
  snippet: SnippetType;
  isLoading: boolean;
  handleNoteChange: (value: string) => void;
};

function NoteEditor({ snippet, isLoading, handleNoteChange }: NoteEditorProps) {
  const handleChange = (value: string | object) => {
    if (typeof value === "string") {
      handleNoteChange(value);
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
