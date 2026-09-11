import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const housingUiStrings = {
  id: "01a06128-d5d5-7969-b568-4feea14f801b",
  type: "module",
  slug: "housing-ui-strings",
  definition: "every phrase the housing window shows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A phrase is put on the holder rather than into a game string id.",
    },
    {
      invariantKind: "gap",
      statement: "English is the only language carried.",
    },
  ],
} as const satisfies Module
