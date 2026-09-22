import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData35 = {
  id: "01a0617f-926c-704f-a09d-713a91510fa6",
  type: "page-type/module",
  slug: "lorebooks-book-data-35",
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
