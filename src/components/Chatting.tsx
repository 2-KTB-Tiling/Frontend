type ChattingType = {
  content: string;
};

export default function Chatting({ content }: ChattingType) {
  return (
    <li className="p-4 self-end max-w-2xl bg-chat-bg rounded-lg">
      <pre>{content}</pre>
    </li>
  );
}
