// todo: use react hook form

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export function NewDeckForm() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const createDeck = api.deck.create.useMutation({
    onSuccess: () => {
      router.push(`/`);
      router.refresh();
      // todo: how do I get the select result from an insert???
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createDeck.mutate({
          name,
          description,
        });
      }}
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name..."
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description..."
      />
      <Button className="block w-full">Create Deck</Button>
    </form>
  );
}
