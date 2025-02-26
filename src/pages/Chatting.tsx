import { PiNotebookBold } from "react-icons/pi";
import { useState } from "react";
import Form from "../components/Form";
import { Chat } from "../types/chat";
import Chatting from "../components/Chatting";
import Viewer from "../components/common/Viewer";
import { v4 as uuidv4 } from "uuid";

const initialChattings: Chat[] = [
  {
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
console.error('에러 발생:', error);
});
\`\`\`

## 마무리

fetch API와 Markdown을 활용하면, 서버에서 동적으로 콘텐츠를 받아와서 클라이언트 측에서 손쉽게 렌더링할 수 있습니다.
`,
  },
  {
    type: 1,
    content: "이거 수정해줘.",
  },
  {
    type: 1,
    content: "다시 수정해줘.",
  },
  {
    type: -1,
    content: `
      # 오늘의 TIL
서버 통신과 React 이벤트를 학습했습니다.
- fetch API 활용
- TailwindCSS 적용
**실습을 통해 배운 점 정리**

    `,
  },
];

export default function ChattingPage() {
  const [value, setValue] = useState("");
  const [chattings, setChattings] = useState<Chat[]>(initialChattings);

  const addChatting = (newChat: Chat) => {
    setChattings((prev) => [...prev, newChat]);
  };
  return (
    <main className="flex flex-col items-center mx-auto pt-12 pb-8 max-w-3xl w-full min-h-full h-full">
      <div className="flex items-center gap-2 mb-20 text-4xl">
        <PiNotebookBold />
        <h1 className="font-bold">TILing</h1>
      </div>
      <ul className="grow flex flex-col gap-6 w-full">
        {chattings.map(({ type, content }) =>
          type === 1 ? (
            <Chatting key={uuidv4()} content={content} />
          ) : (
            <Viewer key={uuidv4()} content={content} />
          )
        )}
      </ul>
      <Form value={value} onChange={setValue} addChat={addChatting} />
    </main>
  );
}
