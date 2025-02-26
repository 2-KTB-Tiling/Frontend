import { Link } from "react-router";
import { PATH } from "../../constants/routes";

export default function Header() {
  return (
    <header className="flex items-center p-6 md:px-12 md:py-6 border-b border-border">
      <Link to={PATH.ROOT} className="text-xl font-bold">
        TILing
      </Link>
    </header>
  );
}
