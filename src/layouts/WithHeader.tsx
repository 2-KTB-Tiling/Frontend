import { Outlet } from "react-router";
import Header from "../components/common/Header";

export default function WithHeader() {
  return (
    <>
      <Header />
      <div className="mx-auto p-4 max-w-5xl h-[calc(100%-77px)]">
        <Outlet />
      </div>
    </>
  );
}
