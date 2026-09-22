import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksLibraryData = {
  id: "01a06184-3d7d-7bc3-be91-252472ceedf7",
  type: "page-type/module",
  slug: "lorebooks-library-data",
  definition: "the whole Eidetic Memory collection table, taken from its sets in order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are gathered in the order the whole table names.",
    },
  ],
} as const satisfies Module
