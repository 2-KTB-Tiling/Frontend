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
        <div className="flex flex-col items-center gap-6">
          <label htmlFor="url" className="flex gap-4 text-lg font-bold">
            <FaGithub className="text-3xl" />
            GitHub 레포지토리 주소
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-border rounded-lg outline-none px-4 py-2 w-96"
            placeholder="GitHub 레포지토리 주소를 입력해주세요..."
          />
        </div>
      </form>
    </main>
  );
}
