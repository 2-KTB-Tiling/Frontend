import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { login } from "../apis/auth";

export default function LoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("code"));
  useEffect(() => {
    const code = searchParams.get("code");

    const fn = async () => {
      if (code) {
        const data = await login(code);
        console.log(data);
        navigate("/");
      }
    };
    fn();
  }, []);
  return <div>loading</div>;
}
