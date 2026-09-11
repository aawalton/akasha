import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const chatMessageConstants = {
  id: "01a06060-0d15-7df5-abbc-1aabd8bc7f85",
  pageTypeSlug: "module",
  type: "module",
  slug: "chat-message-constants",
  definition: "the fixed values a chat message is built from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A time format is named by a short label a player types.",
    },
  ],
} as const satisfies Module
