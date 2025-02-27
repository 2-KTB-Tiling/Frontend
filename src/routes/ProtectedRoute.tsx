import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
