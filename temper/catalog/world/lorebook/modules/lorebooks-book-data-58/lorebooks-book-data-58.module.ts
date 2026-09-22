import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData58 = {
  id: "01a06180-9f3f-7c46-b854-59b9304df1fb",
  type: "page-type/module",
  slug: "lorebooks-book-data-58",
  definition: "a set of the Eidetic Memory book table, in the order the whole table names them",
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
