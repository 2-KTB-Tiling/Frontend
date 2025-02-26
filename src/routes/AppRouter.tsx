import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import { PATH } from "../constants/routes";
import Login from "../pages/Login";
import Chatting from "../pages/Chatting";
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
              element: <Chatting />,
            },
          ],
        },
        {
          path: PATH.LOGIN,
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
