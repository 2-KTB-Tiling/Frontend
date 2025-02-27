import { useRef, useState } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import { Chat } from "../types/chat";
import { convertTil } from "../apis/Til"; // TIL 변환 API import
import { v4 as uuidv4 } from "uuid";

type FormType = {
  value: string;
  onChange: (value: string) => void;
  addChat: (newChat: Chat) => void;
};

export default function Form({ value, onChange, addChat }: FormType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const submitMessage = async () => {
    if (!value.trim() || isLoading) return;

    // 사용자 메시지 추가
    addChat({
      id: uuidv4(),
      type: 1, // 사용자 메시지 타입
      content: value,
    });

    // 제출 후 값 초기화 및 높이 리셋
    onChange("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsLoading(true);

    try {
      // 로딩 메시지 표시 (선택사항)
      addChat({
        id: uuidv4(), // ID 추가
        type: -1, // 시스템 메시지 타입
        content: "TIL을 변환하는 중입니다...",
        isLoading: true,
      });

      // TIL 변환 API 호출
      const response = await convertTil(value);

      // 로딩 메시지가 있다면 제거 (선택사항)
      addChat({
        id: uuidv4(), // ID 추가
        type: -1, // 시스템 메시지 타입 (임시 로딩 메시지 제거용)
        content: "",
        isLoading: false,
        shouldRemove: true,
      });

      if (response.message === 'convert_success' && response.data) {
        // 변환된 마크다운 내용 추가
        addChat({
          id: uuidv4(), // ID 추가
          type: -1, // 시스템 메시지 타입
          content: response.data.markdown,
        });
      } else {
        // 변환 실패 메시지
        addChat({
          id: uuidv4(), // ID 추가
          type: -1,
          content: "TIL 변환에 실패했습니다. 다시 시도해주세요.",
        });
      }
    } catch (error) {
      // 오류 메시지 추가
      addChat({
        id: uuidv4(), // ID 추가
        type: -1,
        content: "오류가 발생했습니다: " + (error instanceof Error ? error.message : "알 수 없는 오류"),
      });
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className={`absolute bottom-[24px] right-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          <FaCircleArrowUp className={`w-10 h-10 ${isLoading ? 'text-gray-400' : 'text-accent'}`} />
        </button>
      </form>
    </section>
  );
}