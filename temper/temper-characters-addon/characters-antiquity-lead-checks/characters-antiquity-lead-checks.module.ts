import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersAntiquityLeadChecks = {
  id: "01a062ed-39a0-700a-b328-1ae517d89942",
  pageTypeSlug: "module",
  slug: "characters-antiquity-lead-checks",
  definition:
    "the antiquity leads a character holds, and which of those are motif, legendary or unfinished",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A lead is a motif lead where the antiquity's name opens with the style's word.",
    },
  ],
} as const satisfies Module
