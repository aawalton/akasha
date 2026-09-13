import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryResolvedActionRecord = {
  id: "01a09a1e-4d31-7c62-b8f4-3a90e7f51c04",
  type: "module",
  slug: "inventory-resolved-action-record",
  definition: "writing onto a captured item the action and place the rules resolved it to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record is written from inside the run that resolved the item.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here evaluates a rule.",
    },
    {
      invariantKind: "departure",
      statement: "A rescan keeps the record where the slot holds the same link and the same count.",
    },
    {
      invariantKind: "departure",
      statement: "A rescan drops the record where either differs.",
    },
  ],
} as const satisfies Module
