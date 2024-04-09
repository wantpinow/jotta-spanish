import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { cards, decks } from "~/server/db/schema";

export const deckRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.decks.findMany();
  }),
  getDeckById: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.decks.findFirst({
        where: eq(decks.id, input.id),
      });
    }),
  getCardsByDeckId: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.cards.findMany({
        where: eq(cards.deckId, input.id),
      });
    }),
  create: publicProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(decks).values({
        name: input.name,
        description: input.description,
      });
    }),
});
