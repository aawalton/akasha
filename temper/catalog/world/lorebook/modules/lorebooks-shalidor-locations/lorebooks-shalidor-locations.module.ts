import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksShalidorLocations = {
  id: "01a06184-3d7c-7388-9f04-084ca5cea38a",
  type: "page-type/module",
  slug: "lorebooks-shalidor-locations",
  definition: "the whole Shalidor's Library location table, taken from its sets in order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are gathered in the order the whole table names.",
    },
  ],
} as const satisfies Module
