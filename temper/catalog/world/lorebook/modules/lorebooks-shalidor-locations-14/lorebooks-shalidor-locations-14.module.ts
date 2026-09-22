import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksShalidorLocations14 = {
  id: "01a06181-3841-7add-b7df-666251b4288b",
  type: "page-type/module",
  slug: "lorebooks-shalidor-locations-14",
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
      statement: "This set is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
