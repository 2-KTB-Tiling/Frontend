import { PiNotebookBold } from "react-icons/pi";
import Viewer from "../components/common/Viewer";
import { useState } from "react";
import Form from "../components/Form";

export default function Chatting() {
  const [value, setValue] = useState("");

  return (
    <main className="flex flex-col items-center mx-auto pt-12 pb-8 max-w-3xl w-full min-h-full h-full">
      <div className="flex items-center gap-2 mb-20 text-4xl">
        <PiNotebookBold />
        <h1 className="font-bold">TILing</h1>
      </div>
      <section className="grow w-full">
        <Viewer
          content="# Sample Markdown Document  
This is an example markdown text that contains various elements.  
## Section 1: Formatting  
- **Bold text** is important.  
- *Italic text* adds emphasis.  
- `Inline code` is useful.  
## Section 2: Code  
```
js console.log('Hello, world!');
```  
## Final Thoughts  
This document is a simple demonstration of markdown.
"
        />
      </section>
      <Form value={value} onChange={setValue} />
    </main>
  );
}
