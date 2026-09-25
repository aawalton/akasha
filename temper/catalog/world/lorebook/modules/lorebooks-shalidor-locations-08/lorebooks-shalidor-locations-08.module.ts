import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksShalidorLocations08 = {
  id: "01a06181-3840-7cc8-ac28-38f28e64a831",
  type: "page-type/module",
  slug: "lorebooks-shalidor-locations-08",
  definition:
    "a set of the Shalidor's Library location table, in the order the whole table names it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This set is written by `lore-book-writing` from the lore book pages.",
    },
  ],
} as const satisfies Module
