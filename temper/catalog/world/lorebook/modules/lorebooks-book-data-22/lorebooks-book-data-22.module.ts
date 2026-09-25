import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData22 = {
  id: "01a0617f-9268-77f3-a4ec-5ab4cfe6d31e",
  type: "page-type/module",
  slug: "lorebooks-book-data-22",
  definition: "a set of the Eidetic Memory book table, in the order the whole table names them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This set is written by `lore-book-writing` from the lore book pages.",
    },
  ],
} as const satisfies Module
