import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksBookData76 = {
  id: "01a06180-9f43-742d-a9a2-559bc8712651",
  type: "page-type/module",
  slug: "lorebooks-book-data-76",
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
