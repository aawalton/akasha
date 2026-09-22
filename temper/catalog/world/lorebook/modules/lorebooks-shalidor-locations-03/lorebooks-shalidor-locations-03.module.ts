import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksShalidorLocations03 = {
  id: "01a06181-383e-7145-bbbb-91cab1c2901e",
  type: "page-type/module",
  slug: "lorebooks-shalidor-locations-03",
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
      statement: "This run is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
