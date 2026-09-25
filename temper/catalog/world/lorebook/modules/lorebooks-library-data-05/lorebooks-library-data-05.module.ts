import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksLibraryData05 = {
  id: "01a06181-3844-7ddc-9e7f-bbaa57386ff3",
  type: "page-type/module",
  slug: "lorebooks-library-data-05",
  definition:
    "a set of the Eidetic Memory collection table, in the order the whole table names them",
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
