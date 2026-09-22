import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksShalidorLocations05 = {
  id: "01a06181-383f-7245-854a-c83330a1dafa",
  type: "page-type/module",
  slug: "lorebooks-shalidor-locations-05",
  definition:
    "a run of the Shalidor's Library location table, in the order the whole table names it",
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
