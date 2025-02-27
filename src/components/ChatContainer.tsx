import { useState, useEffect, useRef } from "react";
import Form from "./Form";
import Chatting from "./Chatting";
import Viewer from "./Viewer";
import { Chat } from "../types/chat";

export default function ChatContainer() {
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState<Chat[]>([
    // 초기 시스템 메시지 (선택사항)
    {
      type: -1,
      content: "안녕하세요! 오늘 배운 내용을 입력하시면 AI가 TIL 형식으로 변환해 드립니다.",
    },
  ]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 채팅이 추가될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const addChat = (newChat: Chat) => {
    setChats(prevChats => {
      // 임시 로딩 메시지 제거 로직
      if (newChat.shouldRemove) {
        return prevChats.filter(chat => !chat.isLoading);
      }
      
      return [...prevChats, newChat];
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <ul className="flex flex-col gap-4">
          {chats.map((chat, index) => {
            if (chat.type === 1) {
              // 사용자 메시지
              return <Chatting key={index} content={chat.content} />;
            } else {
              // 시스템/AI 메시지
              if (chat.isLoading) {
                // 로딩 상태 표시
                return (
                  <li key={index} className="prose p-4 max-w-2xl w-full bg-chat-bg rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse w-2 h-2 bg-gray-500 rounded-full"></div>
                      <div className="animate-pulse w-2 h-2 bg-gray-500 rounded-full"></div>
                      <div className="animate-pulse w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                  </li>
                );
              }
              // 일반 AI 메시지
              return <Viewer key={index} content={chat.content} />;
            }
          })}
        </ul>
      </div>
      
      <Form 
        value={inputValue} 
        onChange={setInputValue} 
        addChat={addChat} 
      />
    </div>
  );
}