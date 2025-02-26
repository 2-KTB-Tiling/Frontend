import { Outlet } from "react-router";
import Header from "../components/common/Header";

export default function WithHeader() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
