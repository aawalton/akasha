import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData02 = {
  id: "01a0617f-9261-7011-9fb1-d2540a25dcf9",
  type: "page-type/module",
  slug: "lorebooks-book-data-02",
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
  createdAt: "2026-09-02T09:42:25.633Z",
  updatedAt: "2026-09-25T01:26:44.000Z",
} as const satisfies Module
