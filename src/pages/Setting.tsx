import { FaGithub } from "react-icons/fa";
import Logo from "../components/Logo";
import { useState } from "react";
import { setRepoUrl } from "../apis/github";
import { Slide, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import { PATH } from "../constants/routes";

export default function Setting() {
  const [url, setUrl] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (url.trim() === "") return;

    setIsLoading(true);

    // url 저장 로직
    await setRepoUrl(url);

    setIsLoading(false);
    setIsEnrolled(true);
    toast("레포지토리가 등록되었습니다.");
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
            disabled={isLoading || isEnrolled}
            className="border border-border rounded-lg outline-none px-4 py-2 w-96"
            placeholder="GitHub 레포지토리 주소를 입력해주세요..."
          />
          {isEnrolled ? (
            <Link
              to={PATH.ROOT}
              className="flex justify-center items-center rounded-full bg-accent text-white font-bold w-32 h-10 hover:bg-white hover:border hover:border-accent hover:text-accent transition-colors"
            >
              홈으로
            </Link>
          ) : (
            <button className="rounded-full bg-accent text-white font-bold w-32 h-10 hover:bg-white hover:border hover:border-accent hover:text-accent transition-colors">
              전송
            </button>
          )}
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </main>
  );
}
