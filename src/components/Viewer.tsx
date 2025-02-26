import Markdown from "react-markdown";
import { useNavigate } from "react-router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { PATH } from "../constants/routes";

type ViewerType = {
  id: string;
  content: string;
};

export default function Viewer({ id, content }: ViewerType) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH.EDIT.replace(":id", id));
  };
  return (
    <li
      className="prose p-4 max-w-2xl w-full bg-chat-bg rounded-lg cursor-pointer hover:brightness-75 transition duration-200"
      onClick={handleClick}
    >
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
                style={atomDark}
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
