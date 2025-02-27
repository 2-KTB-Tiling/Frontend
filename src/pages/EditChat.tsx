import { useLocation, useNavigate } from "react-router";
import Logo from "../components/Logo";
import MarkdownEditor from "../components/MarkdownEditor/MarkdownEditor";
import { FaLocationArrow } from "react-icons/fa";
import { PATH } from "../constants/routes";
import { useState } from "react";
import { deployTIL } from "../apis/github";

export default function EditChatPage() {
  const { content } = useLocation().state;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [value, setValue] = useState<string>(content || "");

  const handleCancelClick = () => {
    navigate(PATH.ROOT);
  };
  const handleDeployClick = async () => {
    // 배포 로직
    await deployTIL(value, message);

    navigate(PATH.ROOT);
  };
  return (
    <main className="flex flex-col pt-12">
      <Logo />
      <div className="self-end flex items-start gap-2 m-4">
        <label htmlFor="message" className="flex gap-4 text-lg font-bold">
          커밋 메세지
        </label>
        <input
          id="message"
          className="border border-border rounded-lg outline-none px-4 py-2 w-96"
          placeholder="커밋 메시지를 입력해주세요..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <MarkdownEditor value={value} onChange={setValue} />
      <div className="flex justify-end gap-4 mb-12 w-full">
        <button
          className="rounded-full border border-border font-bold w-32 h-10 text-dark-text hover:border-gray-600 hover:text-gray-600 transition-colors"
          onClick={handleCancelClick}
        >
          취소
        </button>
        <button
          className="flex justify-center items-center gap-2 rounded-full bg-accent text-white font-bold w-32 h-10 hover:bg-white hover:border hover:border-accent hover:text-accent transition-colors"
          onClick={handleDeployClick}
        >
          <FaLocationArrow />
          <span>배포하기</span>
        </button>
      </div>
    </main>
  );
}
