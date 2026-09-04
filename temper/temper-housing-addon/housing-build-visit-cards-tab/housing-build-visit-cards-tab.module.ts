import type { Module } from "@akasha/code-system/module"

export const housingBuildVisitCardsTab = {
  id: "01a06128-d5c5-7488-b800-14b49d097a7e",
  pageTypeSlug: "module",
  slug: "housing-build-visit-cards-tab",
  definition: "building the controls of the visit cards tab",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Controls are built once and hidden rather than made again.",
    },
  ],
} as const satisfies Module
