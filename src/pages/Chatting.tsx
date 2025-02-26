import { PiNotebookBold } from "react-icons/pi";

export default function Chatting() {
  return (
    <main className="flex justify-center py-12">
      <div className="flex items-center gap-2 text-4xl">
        <PiNotebookBold />
        <h1 className="font-bold">TILing</h1>
      </div>
    </main>
  );
}
