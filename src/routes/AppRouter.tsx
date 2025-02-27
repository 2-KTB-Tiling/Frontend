import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import { PATH } from "../constants/routes";
import LoginPage from "../pages/Login";
import ChattingPage from "../pages/Chatting";
import WithHeader from "../layouts/WithHeader";
import GitHubCallback from "../pages/GitHubCallback"; // GitHub 콜백 컴포넌트 import

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <App />,
      children: [
        {
          element: <WithHeader />,
          children: [
            {
              index: true,
              element: <ChattingPage />,
            },
          ],
        },
        {
          path: PATH.LOGIN,
          element: <LoginPage />,
        },
        {
          // GitHub 콜백 경로 추가
          path: PATH.GITHUB_CALLBACK,
          element: <GitHubCallback />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}