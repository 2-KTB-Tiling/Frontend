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

    날짜: 2023-10-10\n\n### 📌 스크럼\n- 학습 목표 1: Nest.js의 기본 구조 이해\n- 학습 목표 2: 모듈 및 서비스 개념 학습\n- 학습 목표 3: RESTful API 구현 실습\n\n### 📖 새로 배운 내용\n\n#### 🔹 주제 1: Nest.js 기본 구조\n📌 Nest.js는 모듈화된 구조\n- 모듈은 관련된 기능을 그룹화\n- Controller, Service, Module로 구성\n\n#### 🔹 주제 2: RESTful API 구현\n📌 RESTful API를 쉽게 구현\n- GET, POST, PUT, DELETE 메서드 사용\n- DTO(Data Transfer Object)를 활용하여 데이터 유효성 검사\n\n### 🎯 오늘의 도전 과제와 해결 방법\n- 도전 과제 1: Nest.js 설치 과정에서 오류 발생  \n  → Node.js와 npm 버전 확인 후 재설치\n- 도전 과제 2: RESTful API 테스트 도구 사용  \n  → Postman을 활용하여 API 요청 테스트\n\n### 📝 오늘의 회고\n- Nest.js의 구조가 직관적이라 이해하기 쉬웠음 \n- 실습을 통해 RESTful API의 작동 방식이 명확해짐\n\n### 🔗 참고 자료 및 링크\n- Nest.js 공식 문서

    `,
  },
];

export default function ChattingPage() {
  // 스크롤 컨테이너용 ref
  const containerRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("");
  const [chattings, setChattings] = useState<Chat[]>([]);

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

  // useEffect(() => {
  // fetch("/api/v1/summation", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     content: "오늘 배운 내용을 Markdown으로 변환해 주세요.",
  //   }),
  // }).then(console.log);
  // }, []);
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
