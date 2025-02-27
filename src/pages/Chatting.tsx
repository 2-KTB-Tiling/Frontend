import { useEffect, useRef, useState } from "react";
import Form from "../components/Form";
import { Chat } from "../types/chat";
import Chatting from "../components/Chatting";
import MarkdownViewer from "../components/MarkdownViewer";
import Logo from "../components/Logo";
import { getAllChats } from "../apis/localStorage";

export default function ChattingPage() {
  // 스크롤 컨테이너용 ref
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const [value, setValue] = useState("");
  const [chattings, setChattings] = useState<Chat[]>(() => getAllChats());

  const addChatting = (newChat: Chat) => {
    setChattings((prev) => [...prev, newChat]);
  };

  // chattings 배열이 변경될 때마다 스크롤을 가장 아래로 이동
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: isFirstRender.current ? "instant" : "smooth",
      });
    }

    // 첫 렌더링 이후 `smooth`가 적용되도록 변경
    isFirstRender.current = false;
  }, [chattings]);
  return (
    <main className="flex flex-col items-center mx-auto pt-12 max-w-3xl w-full min-h-full h-full">
      <div ref={containerRef} className="grow w-full overflow-y-auto">
        <Logo />
        <ul className="flex flex-col gap-6 w-full">
          {chattings.map(({ id, type, content }) =>
            type === 1 ? (
              <Chatting key={id} content={content} />
            ) : (
              <MarkdownViewer key={id} id={id} content={content} />
            )
          )}
        </ul>
      </div>
      <Form value={value} onChange={setValue} sendChat={addChatting} />
    </main>
  );
}
