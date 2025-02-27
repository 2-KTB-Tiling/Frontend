import { PiNotebookBold } from "react-icons/pi";
import { Link } from "react-router";
import { PATH } from "../constants/routes";

export default function Logo() {
  return (
    <div className="mb-20">
      <Link
        to={PATH.ROOT}
        className="flex justify-center items-center gap-2 text-4xl"
      >
        <PiNotebookBold />
        <h1 className="font-bold">TILing</h1>
      </Link>
    </div>
  );
}
