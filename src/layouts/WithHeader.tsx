import { Outlet } from "react-router";
import Header from "../components/Header";

export default function WithHeader() {
  return (
    <>
      <Header />
      <div className="mx-auto px-4 max-w-5xl h-[calc(100%-77px)]">
        <Outlet />
      </div>
    </>
  );
}
