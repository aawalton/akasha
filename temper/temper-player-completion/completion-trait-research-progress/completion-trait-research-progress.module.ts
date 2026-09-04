import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionTraitResearchProgress = {
  id: "01a06358-4f7c-72b2-9eaf-52313ad702f9",
  pageTypeSlug: "module",
  slug: "completion-trait-research-progress",
  definition:
    "the item traits each character has researched, counted by research line and by craft",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The craft type catalog and the research line catalog arrive as arguments.",
    },
    {
      invariantKind: "departure",
      statement: "A research line hangs beneath the craft type the parent names.",
    },
    {
      invariantKind: "departure",
      statement: "A craft type is ordered by the game number.",
    },
    {
      invariantKind: "departure",
      statement: "A research line is ordered by the display order.",
    },
    {
      invariantKind: "departure",
      statement: "A trait is matched to the game's record by the trait's name in lower case.",
    },
    {
      invariantKind: "departure",
      statement: "A character the store has not read is left out of the answer.",
    },
    {
      invariantKind: "departure",
      statement: "Each completeness check takes the catalog as arguments too.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty catalog leaves nothing for a completeness check to hold true.",
    },
  ],
} as const satisfies Module
