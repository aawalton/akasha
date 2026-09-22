import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData55 = {
  id: "01a06180-9f3e-723c-9ca1-380884aa2a60",
  type: "page-type/module",
  slug: "lorebooks-book-data-55",
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
