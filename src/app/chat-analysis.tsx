// "use client";

// import { useState } from "react";
// import { Textarea } from "~/components/ui/textarea";

// export function ChatAnalysis() {
//   const [value, setValue] = useState<string>(
//     "Había una vez en un pequeño pueblo en lo profundo de las montañas, un anciano llamado Miguel. Miguel era conocido por ser el último fabricante de relojes del pueblo. Su taller estaba lleno de engranajes, martillos y campanas que resonaban cada hora. Pero lo que hacía especial a los relojes de Miguel era que cada uno tenía su propia historia.",
//   );

//   return (
//     <div className="space-y-2">
//       <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
//       <div>{value}</div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function ChatAnalysis() {
  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);

  // Create a reference to the worker object.
  const worker = useRef(null);

  // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case "initiate":
          setReady(false);
          break;
        case "ready":
          setReady(true);
          break;
        case "complete":
          setResult(e.data.output[0]);
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const classify = useCallback((text) => {
    if (worker.current) {
      worker.current.postMessage({ text });
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="mb-2 text-center text-5xl font-bold">Transformers.js</h1>
      <h2 className="mb-4 text-center text-2xl">Next.js template</h2>

      <input
        className="mb-4 w-full max-w-xs rounded border border-gray-300 p-2"
        type="text"
        placeholder="Enter text here"
        onInput={(e) => {
          classify(e.target.value);
        }}
      />

      {ready !== null && (
        <pre className="rounded bg-gray-100 p-2">
          {!ready || !result ? "Loading..." : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
