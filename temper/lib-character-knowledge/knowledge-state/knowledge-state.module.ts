import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const knowledgeState = {
  id: "01a06226-4903-78dc-9a7c-de38884ab4ee",
  type: "module",
  slug: "knowledge-state",
  definition: "the two tables the library keeps everything else on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The library hangs its work off the two tables this module has.",
    },
  ],
} as const satisfies Module
