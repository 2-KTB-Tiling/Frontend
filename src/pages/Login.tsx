import { FaGithub } from "react-icons/fa";
import { PiNotebookBold } from "react-icons/pi";
import { GITHUB_AUTH_URL } from "../apis/auth";

export default function LoginPage() {
  // GitHub 로그인 처리 함수
  const handleGitHubLogin = () => {
    window.location.href = GITHUB_AUTH_URL;
  };

  return (
    <main className="flex flex-col justify-center items-center gap-20 h-full">
      <header className="flex items-center gap-2 text-4xl">
        <PiNotebookBold />
        <h1 className="font-bold">TILing</h1>
      </header>
      <button 
        onClick={handleGitHubLogin}
        className="flex items-center gap-4 px-8 md:px-12 py-2 md:py-3 border border-border rounded-full hover:bg-black hover:text-white transition-colors"
      >
        <FaGithub className="text-3xl" />
        <span className="font-semibold text-sm md:text-base">
          GitHub 로그인
        </span>
      </button>
    </main>
  );
}