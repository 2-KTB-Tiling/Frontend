import { useLocation, useParams } from "react-router";
import Logo from "../components/Logo";
import MarkdownEditor from "../components/MarkdownEditor/MarkdownEditor";

export default function EditChatPage() {
  const { id } = useParams();
  const { content } = useLocation().state;

  return (
    <main className="flex flex-col pt-12">
      <Logo />
      <MarkdownEditor content={content} />
    </main>
  );
}
