import type { Module } from "@akasha/code-system/module"

export const chatMessagePublicApi = {
  id: "01a06060-0d18-7688-8eab-91ba2a064865",
  pageTypeSlug: "module",
  slug: "chat-message-public-api",
  definition: "the name the chat message library puts in the game's global table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Loading the library a second time raises an error.",
    },
  ],
} as const satisfies Module
