import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryTypes = {
  id: "01a060c5-3c23-76ec-aa93-fa279ae67a96",
  type: "module",
  slug: "inventory-types",
  definition: "what an inventory has and the item numbers the game gives",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item carries the game's junk state as `junk` and `junkable`.",
    },
    {
      invariantKind: "departure",
      statement: "A capture taken before a field was recorded leaves that field off the item.",
    },
  ],
} as const satisfies Module
