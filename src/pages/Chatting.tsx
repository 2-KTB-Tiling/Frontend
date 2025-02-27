import { useEffect, useRef, useState } from "react";
import Form from "../components/Form";
import { Chat } from "../types/chat";
import Chatting from "../components/Chatting";
import MarkdownViewer from "../components/MarkdownViewer";
import { v4 as uuidv4 } from "uuid";
import Logo from "../components/Logo";

const initialChattings: Chat[] = [
  {
    id: uuidv4(),
    type: -1,
    content: `
# 오늘의 TIL (Today I Learned)

오늘은 **fetch API**와 Markdown 활용법에 대해 학습했습니다.

## 주요 학습 내용

- **비동기 통신**: fetch를 사용하여 서버에서 데이터를 받아올 수 있습니다.
- **Markdown 렌더링**: 받아온 텍스트를 react-markdown 등으로 렌더링할 수 있습니다.
- **에러 처리**: 네트워크 에러 및 파싱 에러에 대한 예외 처리가 필요합니다.

## 예제 코드

\`\`\`js
fetch('https://api.example.com/markdown')
  .then(response => response.text())
  .then(markdown => {
    // 받아온 마크다운 문자열을 상태에 저장하거나 렌더링합니다.
    console.log(markdown);
  })
  .catch(error => {
    에러 발생:', error);
  });
\`\`\`

## 마무리

fetch API와 Markdown을 활용하면, 서버에서 동적으로 콘텐츠를 받아와서 클라이언트 측에서 손쉽게 렌더링할 수 있습니다.
`,
  },
  {
    id: uuidv4(),
    type: 1,
    content: "이거 수정해줘.",
  },
  {
    id: uuidv4(),
    type: 1,
    content: "다시 수정해줘.",
  },
  {
    id: uuidv4(),
    type: -1,
    content: `
# 오늘의 TIL

서버 통신과 React 이벤트를 학습했습니다.

- fetch API 활용
- TailwindCSS 적용 **실습을 통해 배운 점 정리**

    `,
  },
];

export default function ChattingPage() {
  // 스크롤 컨테이너용 ref
  const containerRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("");
  const [chattings, setChattings] = useState<Chat[]>(initialChattings);

  const addChatting = (newChat: Chat) => {
    setChattings((prev) => [...prev, newChat]);
  };

  // chattings 배열이 변경될 때마다 스크롤을 가장 아래로 이동
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
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

      <Form value={value} onChange={setValue} addChat={addChatting} />
    </main>
  );
}
