import { postRouter } from "~/server/api/routers/post";
import { deckRouter } from "~/server/api/routers/deck";
import { liteLLMRouter } from "~/server/api/routers/litellm";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { modalRouter } from "./routers/modal";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  deck: deckRouter,
  litellm: liteLLMRouter,
  modal: modalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
