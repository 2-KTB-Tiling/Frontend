import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import { PATH } from "../constants/routes";
import LoginPage from "../pages/Login";
import ChattingPage from "../pages/Chatting";
import WithHeader from "../layouts/WithHeader";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
