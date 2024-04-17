"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { env } from "~/env";
import { DefaultService } from "~/lib/python_client";
import { api } from "~/trpc/react";

export const MessageAnalysisContext = createContext<
  | {
      value: string;
      setValue: (value: string) => void;
      embedding?: number[];
      loading: boolean;
    }
  | undefined
>(undefined);

export function MessageAnalysisProvider({
  initialValue,
  children,
}: {
  initialValue?: string;
  children: React.ReactNode;
}) {
  const [value, setValue] = useState<string>(initialValue ?? "");
  const [embedding, setEmbedding] = useState<number[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const embed = api.modal.embed.useMutation({
    onMutate: () => {
      setEmbedding(undefined);
    },
    onSuccess: (data) => {
      setEmbedding(data);
    },
  });

  useEffect(() => {
    embed.mutate({ text: value });
  }, [value]);

  useEffect(() => {
    if (embedding === undefined) {
      setLoading(true);
      return;
    }
    setLoading(false);
  }, [embedding]);

  return (
    <MessageAnalysisContext.Provider
      value={{ value, setValue, embedding, loading }}
    >
      {children}
    </MessageAnalysisContext.Provider>
  );
}

export const useMessageAnalysis = () => {
  const context = useContext(MessageAnalysisContext);
  if (!context) {
    throw new Error(
      "useMessageAnalysis must be used within a MessageAnalysisProvider",
    );
  }
  return context;
};

export function ChatAnalysis() {
  return (
    <MessageAnalysisProvider initialValue="Había una vez en un pequeño pueblo en lo profundo de las montañas, un anciano llamado Miguel. Miguel era conocido por ser el último fabricante de relojes del pueblo. Su taller estaba lleno de engranajes, martillos y campanas que resonaban cada hora. Pero lo que hacía especial a los relojes de Miguel era que cada uno tenía su propia historia.">
      <MessageAnalysis />
    </MessageAnalysisProvider>
  );
}

export function MessageAnalysis() {
  const { value, setValue, embedding, loading } = useMessageAnalysis();
  const [inputValue, setInputValue] = useState<string>(value);
  return (
    <div className="space-y-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setValue(inputValue);
        }}
      >
        <Textarea
          value={inputValue}
          disabled={loading}
          onChange={(e) => setInputValue(e.target.value)}
          className={loading ? "animate-pulse" : ""}
        />
        <Button disabled={loading} type="submit" className="ml-auto mt-4 block">
          Analyze
        </Button>
      </form>
    </div>
  );
}
