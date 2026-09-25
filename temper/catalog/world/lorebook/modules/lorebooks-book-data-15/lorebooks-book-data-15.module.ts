import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData15 = {
  id: "01a0617f-9265-7028-b505-9e0752fa22d8",
  type: "page-type/module",
  slug: "lorebooks-book-data-15",
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
