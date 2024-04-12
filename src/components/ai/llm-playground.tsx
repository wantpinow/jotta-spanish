"use client";

import { useState } from "react";
import { type LLMCompletionResponse } from "~/app/api/chat/route";

export function LLMPlayground() {
  const [data, setData] = useState<LLMCompletionResponse[]>([]);

  async function* streamingFetch() {
    const response = await fetch("/api/chat");
    // const response = await fetch("/api/chat/stream");
    // const response = await fetch("http://localhost:5328/api/chat/stream");
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
      let offset = 0;
      const parsed: LLMCompletionResponse[] = [];
      for (let idx = 0; idx < decoded.length; idx++) {
        try {
          parsed.push(
            JSON.parse(decoded.slice(offset, idx + 1)) as LLMCompletionResponse,
          );
          offset = idx + 1;
        } catch (e) {
          continue;
        }
      }
      yield parsed;
    }
  }

  async function fetchStream() {
    for await (const chunks of streamingFetch()) {
      setData((prev) => [...prev, ...chunks]);
      console.log(chunks);
    }
  }

  return (
    <div>
      <button onClick={fetchStream}>Fetch</button>
      <button onClick={() => setData([])}>Clear</button>
      {data.map((d, i) => (
        <div key={i}>{JSON.stringify(d, null, 2)}</div>
      ))}
    </div>
  );
}
