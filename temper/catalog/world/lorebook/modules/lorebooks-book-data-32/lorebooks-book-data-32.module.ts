import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData32 = {
  id: "01a0617f-926b-7978-8d46-7834a2158b4a",
  type: "page-type/module",
  slug: "lorebooks-book-data-32",
  definition: "a run of the Eidetic Memory book table, in the order the whole table names them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This run is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
