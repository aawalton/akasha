import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData = {
  id: "01a06184-3d7a-7159-9078-b8208d5ec58b",
  type: "page-type/module",
  slug: "lorebooks-book-data",
  definition: "the whole Eidetic Memory book table, gathered from its sets in order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are gathered in the order the whole table names.",
    },
  ],
} as const satisfies Module
