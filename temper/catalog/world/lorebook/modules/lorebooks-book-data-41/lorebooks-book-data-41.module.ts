import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData41 = {
  id: "01a0617f-926e-78e3-b089-f2a568e0cb83",
  type: "page-type/module",
  slug: "lorebooks-book-data-41",
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
