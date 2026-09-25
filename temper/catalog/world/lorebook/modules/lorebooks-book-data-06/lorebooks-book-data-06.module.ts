import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData06 = {
  id: "01a0617f-9262-7e35-97e8-07a97c71626f",
  type: "page-type/module",
  slug: "lorebooks-book-data-06",
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
