import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const guildStorePoster = {
  id: "01a060a9-5d59-7ff2-971b-202f4a680195",
  type: "module",
  slug: "guild-store-poster",
  definition: "the handshake the game asks for before an item goes up for sale",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One post is in flight at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item outside the backpack is never posted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The item is set pending before the post is issued.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The post is issued from the game's pending-item event.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller asking while a post is in flight is answered false.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A trading house error settles the post as failed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Disposal unregisters the three events the flow registered.",
    },
  ],
} as const satisfies Module
