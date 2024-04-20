import { env } from "~/env";
import { OpenAPI } from "~/lib/python_client";
import { openApiTsSchema } from "~/lib/python_client/zod_schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

OpenAPI.BASE = `https://${env.MODAL_USER}-${env.MODAL_ENV}--${env.MODAL_ROUTER_APP}.modal.run`;
OpenAPI.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers,
    Authorization: `Bearer ${env.MODAL_ROUTER_AUTH_TOKEN}`,
  };
  return request;
});

export const modalRouter = createTRPCRouter({
  embed: protectedProcedure
    .input(openApiTsSchema.shape["/embed"].shape.get.shape.req)
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.modal.embedEmbedGet(input);
      return response.data;
    }),
  process: protectedProcedure
    .input(openApiTsSchema.shape["/process"].shape.get.shape.req)
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.modal.processProcessGet(input);
      return response.data;
    }),
});
