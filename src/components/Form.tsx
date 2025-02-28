import { useRef, useState } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import { Chat } from "../types/chat";
import { v4 as uuidv4 } from "uuid";
import { convertTIL } from "../apis/llm";
import { addChat } from "../apis/localStorage";
import { FaSpinner } from "react-icons/fa";

type FormType = {
  value: string;
  onChange: (value: string) => void;
  sendChat: (newChat: Chat) => void;
};

export default function Form({ value, onChange, sendChat }: FormType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const submitMessage = async () => {
    setIsLoading(true);
    const myChat: Chat = {
      id: uuidv4(),
      type: 1,
      content: value,
    };
    sendChat(myChat);

    // localStorage에 저장
    addChat(myChat);

    // 제출 후 값 초기화 및 높이 리셋
    onChange("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const data = await convertTIL(value);
    const llmChat: Chat = {
      id: uuidv4(),
      type: -1,
      content: data.data.markdown,
    };
    sendChat(llmChat);

    // localStorage에 저장
    addChat(llmChat);
    setIsLoading(false);
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    // 높이 초기화 후 scrollHeight를 기반으로 다시 설정
    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, 384);
    el.style.height = `${newHeight}px`;
    // 최대 높이 도달 시 스크롤 활성화
    el.style.overflowY = el.scrollHeight > 384 ? "auto" : "hidden";
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Shift 키 없이 Enter 누르면 제출, Shift+Enter는 기본 동작(줄바꿈)
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submitMessage();
    }
  };
  return (
    <section className="sticky bottom-0 mt-4 pt-2 pb-4 w-full bg-white z-30">
      <form
        className="relative"
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage();
        }}
      >
        <textarea
          disabled={isLoading}
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            handleValueChange(e);
          }}
          onKeyDown={handleKeyDown}
          placeholder="오늘의 TIL을 입력해주세요..."
          className="w-full p-4 border border-border rounded-2xl resize-none outline-none"
          style={{ maxHeight: "384px" }}
        />
        <button type="submit" className="absolute bottom-[24px] right-3">
          {isLoading ? (
            <FaSpinner className="animate-spin text-[40px] text-accent" />
          ) : (
            <FaCircleArrowUp className="w-10 h-10 text-accent" />
          )}
        </button>
      </form>
    </section>
  );
}
