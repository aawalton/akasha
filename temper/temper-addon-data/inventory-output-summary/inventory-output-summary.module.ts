import type { Module } from "@akasha/code-system/module"

export const inventoryOutputSummary = {
  id: "01a06837-d6c9-7e57-9fef-5ee1cdee6b41",
  pageTypeSlug: "module",
  slug: "inventory-output-summary",
  definition: "the line a run prints for what the inventory section landed and where",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count is taken from what temper holds rather than from the file written.",
    },
    {
      invariantKind: "departure",
      statement: "A set whose game id stands at zero is no set the game knows and is not counted.",
    },
  ],
} as const satisfies Module
