import type { Module } from "@akasha/code-system/module"

export const housingVisitCardsInteract = {
  id: "01a06128-d5d6-7897-939f-8aa6659a7dcf",
  pageTypeSlug: "module",
  slug: "housing-visit-cards-interact",
  definition: "what clicking a received visit card does",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One card is selected at a time.",
    },
  ],
} as const satisfies Module
