import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData81 = {
  id: "01a06180-9f45-707a-8223-f3f4d4c7414e",
  type: "page-type/module",
  slug: "lorebooks-book-data-81",
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
