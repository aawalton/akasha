import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryItemData = {
  id: "01a06258-b52d-7b46-8cda-3be08ef726d7",
  type: "module",
  slug: "inventory-item-data",
  definition:
    "reading one slot into the saved item shape, with its price source, lock state and junk state",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The price source says whether Tamriel Trade Centre holds a price table.",
    },
    {
      invariantKind: "departure",
      statement: "A source answering with no price table is told apart from no price source.",
    },
    {
      invariantKind: "departure",
      statement: "The table itself is read rather than the sentence the addon renders about it.",
    },
    {
      invariantKind: "departure",
      statement: "A slot records whether the game holds the item junk now.",
    },
    {
      invariantKind: "departure",
      statement: "A slot records whether the game would let the item be marked junk.",
    },
    {
      invariantKind: "departure",
      statement: "The game is asked about junk rather than the answer being worked out here.",
    },
  ],
} as const satisfies Module
