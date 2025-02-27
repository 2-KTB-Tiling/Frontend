import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import { PATH } from "../constants/routes";
import LoginPage from "../pages/Login";
import ChattingPage from "../pages/Chatting";
import WithHeader from "../layouts/WithHeader";
import EditChatPage from "../pages/EditChat";
import Setting from "../pages/Setting";

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
            {
              path: PATH.EDIT,
              element: <EditChatPage />,
            },
            {
              path: PATH.SETTING,
              element: <Setting />,
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
