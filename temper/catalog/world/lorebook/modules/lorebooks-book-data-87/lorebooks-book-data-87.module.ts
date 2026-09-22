import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData87 = {
  id: "01a06180-9f46-75d3-a460-279189eb50f4",
  type: "page-type/module",
  slug: "lorebooks-book-data-87",
  definition: "a run of the Eidetic Memory book table, in the order the whole table names them",
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
