import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksShalidorLocations15 = {
  id: "01a06181-3842-72dd-a5f6-7ad4f9af4829",
  type: "page-type/module",
  slug: "lorebooks-shalidor-locations-15",
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
