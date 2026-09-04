import type { Module } from "@akasha/code-system/module"

export const knowledgeState = {
  id: "01a06226-4903-78dc-9a7c-de38884ab4ee",
  pageTypeSlug: "module",
  slug: "knowledge-state",
  definition: "the two tables the library keeps everything else on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The library hangs its work off the two tables this module holds.",
    },
  ],
} as const satisfies Module
