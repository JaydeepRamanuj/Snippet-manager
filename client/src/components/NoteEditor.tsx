import type { Content } from "@tiptap/react";
import { useState } from "react";
import { MinimalTiptapEditor } from "./minimal-tiptap";

function NoteEditor() {
  const [value, setValue] = useState<Content>("");
  return (
    <div className="h-full">
      <MinimalTiptapEditor
        value={value}
        onChange={setValue}
        className="w-full"
        editorContentClassName="p-5"
        output="html"
        placeholder="Enter your description..."
        autofocus={false}
        editable={true}
        editorClassName="focus:outline-hidden"
      />
    </div>
  );
}
export default NoteEditor;
