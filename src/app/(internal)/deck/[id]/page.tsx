import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function DeckPage({ params }: { params: { id: string } }) {
  const deck = await api.deck.getDeckById({ id: parseInt(params.id) });
  const cards = await api.deck.getCardsByDeckId({ id: parseInt(params.id) });
  if (!deck) {
    return redirect("/");
  }
  return (
    <div>
      {/* <div className="flex justify-between">
        <div></div>
        <div className="text-sm text-foreground/70">
          {cards.length} card{cards.length !== 1 && "s"}
        </div>
      </div> */}
      <div className="flex w-full">
        <div className="grow">
          <div className="py-8">
            {cards.length === 0 && (
              <div className="text-center">No cards found.</div>
            )}
          </div>
        </div>
        <div className="h-fit w-[260px] flex-none space-y-2 border px-4 py-3">
          <Button className="w-full">Add Cards</Button>
          <Button className="w-full">Suggest Cards</Button>
        </div>
      </div>
    </div>
  );
}
