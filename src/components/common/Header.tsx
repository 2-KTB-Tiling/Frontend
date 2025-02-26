import { Link } from "react-router";
import { PATH } from "../../constants/routes";

export default function Header() {
  return (
    <header className=" sticky top-0 flex items-center p-6 md:px-12 md:py-6 bg-white border-b border-border z-[9999]">
      <Link to={PATH.ROOT} className="text-xl font-bold">
        TILing
      </Link>
    </header>
  );
}
