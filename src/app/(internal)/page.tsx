import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function Homepage() {
  // get all decks
  const decks = await api.deck.getAll();
  return (
    <div>
      <div className="mb-8 text-3xl font-semibold">Hola Patrick!</div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {decks.map((deck) => (
          <Link key={deck.id} href={`/deck/${deck.id}`}>
            <div className="rounded-lg border border-muted bg-primary px-3 py-3 text-primary-foreground hover:brightness-90">
              <div className="text-xl font-bold">{deck.name}</div>
              <div className="text-sm text-primary-foreground/70">
                {deck.description ?? "No Description"}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Button asChild>
        <Link href="/deck/new">New Deck</Link>
      </Button>
    </div>
  );
}
