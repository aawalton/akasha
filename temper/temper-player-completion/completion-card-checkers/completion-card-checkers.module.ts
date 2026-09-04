import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCardCheckers = {
  id: "01a0640c-1e9a-73f9-8755-c19243c58c9d",
  pageTypeSlug: "module",
  slug: "completion-card-checkers",
  definition: "what answers whether a character has finished each completion card",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A card the registry does not name has no checker and reads as unmeasured.",
    },
    {
      invariantKind: "departure",
      statement: "A card stating no picker is one leaf at the empty path.",
    },
  ],
} as const satisfies Module
