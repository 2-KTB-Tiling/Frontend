// GitHubCallback.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { githubLogin } from "../apis/Auth";

export default function GitHubCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loginWithGitHub = async () => {
      // URL에서 코드 파라미터 추출
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      
      if (!code) {
        setError("GitHub 인증 코드를 찾을 수 없습니다.");
        return;
      }
      
      try {
        // 백엔드에 코드 전송
        const response = await githubLogin(code);
        
        // 로그인 성공 시 홈페이지로 리다이렉트
        if (response.message === "login_success") {
          navigate("/"); // 또는 대시보드나 TIL 작성 페이지로
        } else {
          setError("로그인에 실패했습니다.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.");
      }
    };
    
    loginWithGitHub();
  }, [navigate]);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          <p className="mt-4">GitHub 로그인 중입니다...</p>
        </div>
      )}
    </div>
  );
}