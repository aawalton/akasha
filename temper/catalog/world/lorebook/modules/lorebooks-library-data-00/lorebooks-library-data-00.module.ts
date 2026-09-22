import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksLibraryData00 = {
  id: "01a06181-3843-7154-ab60-606321f5b43b",
  type: "page-type/module",
  slug: "lorebooks-library-data-00",
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
      statement: "This set is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
