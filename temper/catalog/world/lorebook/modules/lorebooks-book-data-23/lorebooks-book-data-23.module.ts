import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData23 = {
  id: "01a0617f-9268-70a4-b457-b33dd7bf29eb",
  type: "page-type/module",
  slug: "lorebooks-book-data-23",
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
