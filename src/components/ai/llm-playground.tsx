"use client";

import { useChat } from "ai/react";
import { use, useEffect, useState } from "react";

export function LLMPlayground() {
  const [data, setData] = useState<string[]>([]);

  async function* streamingFetch() {
    const response = await fetch("/api/chat");
    if (!response.body) throw new Error("No body");
    // Attach Reader
    const reader = response.body.getReader();
    while (true) {
      // wait for next encoded chunk
      const { done, value } = await reader.read();
      // check if stream is done
      if (done) break;
      // Decodes data chunk and yields it
      const decoded = new TextDecoder().decode(value);
      yield decoded;
    }
  }

  async function fetchStream() {
    for await (const chunk of streamingFetch()) {
      setData((prev) => [...prev, chunk]);
      console.log(chunk);
    }
  }

  return (
    <div>
      <button onClick={fetchStream}>Fetch</button>
      <button onClick={() => setData([])}>Clear</button>
      {data.map((d, i) => (
        <div key={i}>{d}</div>
      ))}
    </div>
  );
  //   const { messages, input, handleInputChange, handleSubmit } = useChat();
  //   console.log(messages);
  //   return (
  //     <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
  //       {messages.map((m) => (
  //         <div key={m.id} className="whitespace-pre-wrap">
  //           {m.role === "user" ? "User: " : "AI: "}
  //           {m.content}
  //         </div>
  //       ))}

  //       <form onSubmit={handleSubmit}>
  //         <input
  //           className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
  //           value={input}
  //           placeholder="Say something..."
  //           onChange={handleInputChange}
  //         />
  //       </form>
  //     </div>
  //   );
}
