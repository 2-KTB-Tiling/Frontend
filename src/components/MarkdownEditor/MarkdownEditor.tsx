import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "./MarkdownEditor.css";

type MarkdownEditorType = {
  value: string;
  onChange: (content: string) => void;
};

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorType) {
  return (
    <section className="mb-8 px-4 w-full overflow-y-auto">
      <MDEditor
        data-color-mode="light"
        className="prose w-full min-w-full border border-border"
        height={520}
        // hideToolbar
        minHeight={400}
        maxHeight={600}
        value={value}
        onChange={(value) => {
          onChange(value || "");
        }}
      />
    </section>
  );
}
