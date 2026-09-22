import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData13 = {
  id: "01a0617f-9265-7256-be98-2cce64efb67a",
  type: "page-type/module",
  slug: "lorebooks-book-data-13",
  definition: "a set of the Eidetic Memory book table, in the order the whole table names them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This set is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
