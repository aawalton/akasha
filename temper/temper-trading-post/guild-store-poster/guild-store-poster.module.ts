import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const guildStorePoster = {
  id: "01a060a9-5d59-7ff2-971b-202f4a680195",
  pageTypeSlug: "module",
  slug: "guild-store-poster",
  definition: "the handshake the game asks for before an item goes up for sale",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The item is set pending before the post is issued.",
    },
    {
      invariantKind: "departure",
      statement: "The post is issued from the game's pending-item event.",
    },
    {
      invariantKind: "departure",
      statement: "A caller asking while a post is in flight is answered false.",
    },
    {
      invariantKind: "departure",
      statement: "A trading house error settles the post as failed.",
    },
    {
      invariantKind: "departure",
      statement: "Disposal unregisters the three events the flow registered.",
    },
  ],
} as const satisfies Module
