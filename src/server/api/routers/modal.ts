import { openApiTsSchema } from "~/lib/python_client/zod_schema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const modalRouter = createTRPCRouter({
  embed: publicProcedure
    .input(openApiTsSchema.shape["/embed"].shape.get.shape.req)
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.modal.embedEmbedGet(input);
      return response.data;
    }),
});
