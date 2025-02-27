import { PiNotebookBold } from "react-icons/pi";

export default function Logo() {
  return (
    <div className="flex justify-center items-center gap-2 mb-20 text-4xl">
      <PiNotebookBold />
      <h1 className="font-bold">TILing</h1>
    </div>
  );
}
