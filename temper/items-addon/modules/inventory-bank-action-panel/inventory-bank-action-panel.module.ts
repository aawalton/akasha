import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBankActionPanel = {
  id: "01a06258-b527-758b-b9d3-f61c61aec470",
  type: "module",
  slug: "inventory-bank-action-panel",
  definition: "the small panel shown at the bank with the counts of what is about to move",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The counts shown are tallied by the sweep that opened the bank.",
    },
    {
      invariantKind: "absence",
      statement: "No verdict this panel shows outlives the sweep that judged it.",
    },
  ],
} as const satisfies Module
