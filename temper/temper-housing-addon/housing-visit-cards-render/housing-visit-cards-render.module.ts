import type { Module } from "@akasha/code-system/module"

export const housingVisitCardsRender = {
  id: "01a06128-d5d6-7c5b-a636-be1909ea5a7d",
  pageTypeSlug: "module",
  slug: "housing-visit-cards-render",
  definition: "drawing one row for each received visit card",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A received card is kept in saved variables until the player removes that card.",
    },
  ],
} as const satisfies Module
