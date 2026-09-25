import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData75 = {
  id: "01a06180-9f43-7bd4-9c52-d643a6356cf1",
  type: "page-type/module",
  slug: "lorebooks-book-data-75",
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
