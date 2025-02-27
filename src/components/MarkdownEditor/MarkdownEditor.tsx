import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import { useState } from "react";
import "./MarkdownEditor.css";

type MarkdownEditorType = {
  content: string;
};

export default function MarkdownEditor({ content }: MarkdownEditorType) {
  const [value, setValue] = useState<string>(content || "");

  return (
    <section className="mb-10 w-full overflow-y-auto">
      <MDEditor
        data-color-mode="light"
        className="prose w-full min-w-full border border-border"
        height={520}
        // hideToolbar
        minHeight={400}
        maxHeight={600}
        value={value}
        onChange={(value) => {
          setValue(value || "");
        }}
      />
    </section>
  );
}
