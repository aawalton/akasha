import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksShalidorLocations11 = {
  id: "01a06181-3841-7e14-ad7b-9161a9feaf15",
  type: "page-type/module",
  slug: "lorebooks-shalidor-locations-11",
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
