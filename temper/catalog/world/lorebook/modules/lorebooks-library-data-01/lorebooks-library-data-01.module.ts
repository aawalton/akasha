import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksLibraryData01 = {
  id: "01a06181-3843-7011-b264-3ecc707c5e9d",
  type: "page-type/module",
  slug: "lorebooks-library-data-01",
  definition:
    "a set of the Eidetic Memory collection table, in the order the whole table names them",
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
