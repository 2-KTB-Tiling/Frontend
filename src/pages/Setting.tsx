import { FaGithub } from "react-icons/fa";
import Logo from "../components/Logo";
import { useState } from "react";

export default function Setting() {
  const [url, setUrl] = useState("");

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // url 저장 로직
    console.log(url);
  };
  return (
    <main className="flex flex-col justify-center items-center w-full h-full">
      <Logo />
      <form className="mt-8" onSubmit={handleUrlSubmit}>
        <div className="flex flex-col items-center gap-6 relative">
          <label htmlFor="url" className="flex gap-4 text-lg font-bold">
            <FaGithub className="text-3xl" />
            GitHub 레포지토리 주소
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-border rounded-lg outline-none pl-4 pr-16 py-2 w-96"
            placeholder="GitHub 레포지토리 주소를 입력해주세요..."
          />
          <button className="bg-accent w-12 h-8 text-white rounded absolute bottom-[5px] right-[6px] font-bold">
            전송
          </button>
        </div>
      </form>
    </main>
  );
}
