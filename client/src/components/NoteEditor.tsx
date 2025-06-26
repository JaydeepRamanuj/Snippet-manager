import { useState } from "react";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";

function NoteEditor() {
  const [value, setValue] = useState("<p>Write your comments here...</p>");

  // console.log("value =>", value);
  return (
    <div className="h-full">
      <SimpleEditor
        value={value}
        onChange={(value) => {
          typeof value === "string" && setValue(value);
        }}
      />
    </div>
  );
}
export default NoteEditor;
