import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData65 = {
  id: "01a06180-9f40-7b9e-8a7a-d1ed95873f0a",
  type: "page-type/module",
  slug: "lorebooks-book-data-65",
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
