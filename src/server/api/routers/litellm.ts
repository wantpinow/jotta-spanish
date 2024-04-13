import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const liteLLMRouter = createTRPCRouter({
  completion: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(({ input }) => {
      return { response: `Hello, ${input.prompt}!` };
    }),
});
