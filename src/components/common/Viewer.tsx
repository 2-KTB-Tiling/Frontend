import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

type ViewerType = {
  content: string;
};

export default function Viewer({ content }: ViewerType) {
  return (
    <li className="prose p-4 max-w-2xl w-full bg-chat-bg rounded-lg">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { ref, children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                style={materialDark}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </li>
  );
}
