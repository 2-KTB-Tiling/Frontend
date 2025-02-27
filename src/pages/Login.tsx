import { FaGithub } from "react-icons/fa";
import { PiNotebookBold } from "react-icons/pi";

export default function LoginPage() {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_GITHUB_REDIRECT_URI;
  const githubURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=read:user user:email repo`;

  const handleLogin = () => {
    window.location.href = githubURL;
  };
  return (
    <main className="flex flex-col justify-center items-center gap-20 h-full">
      <header className="flex items-center gap-2 text-4xl">
        <PiNotebookBold />
        <h1 className="font-bold">TILing</h1>
      </header>
      <button
        className="flex items-center gap-4 px-8 md:px-12 py-2 md:py-3 border border-border rounded-full hover:bg-black hover:text-white transition-colors"
        onClick={handleLogin}
      >
        <FaGithub className="text-3xl" />
        <span className="font-semibold text-sm md:text-base">
          GitHub 로그인
        </span>
      </button>
    </main>
  );
}
