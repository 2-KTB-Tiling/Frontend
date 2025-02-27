import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { login } from "../apis/auth";
import { PATH } from "../constants/routes";
import { FaSpinner } from "react-icons/fa";

export default function LoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    const loginWithCode = async () => {
      if (code) {
        const { data } = await login(code);

        localStorage.setItem("accessToken", data.access_token);
        navigate(PATH.ROOT);
      }
    };

    loginWithCode();
  }, [navigate]);
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <FaSpinner className="animate-spin text-4xl text-accent" />
    </div>
  );
}
