"use client";

import { createContext, useContext, useState } from "react";

export const OpenAIKeyContext = createContext<
  | {
      key?: string;
      setKey: (key: string) => void;
    }
  | undefined
>(undefined);

export function OpenAIKeyProvider({
  children,
  initialKey,
}: Readonly<{
  children: React.ReactNode;
  initialKey?: string;
}>) {
  const [key, setKey] = useState(initialKey);

  const value = {
    key,
    setKey,
  };

  return (
    <OpenAIKeyContext.Provider value={value}>
      {children}
    </OpenAIKeyContext.Provider>
  );
}

export function useOpenAIKey() {
  const context = useContext(OpenAIKeyContext);

  if (!context) {
    throw new Error("useOpenAIKey must be used within an OpenAIKeyProvider");
  }

  return context;
}
