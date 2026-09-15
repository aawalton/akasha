import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionTraitResearchProgress = {
  id: "01a06358-4f7c-72b2-9eaf-52313ad702f9",
  type: "module",
  slug: "completion-trait-research-progress",
  definition:
    "the item traits each character has researched, counted by research line and by craft",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The craft type catalog and the research line catalog arrive as arguments.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A research line hangs beneath the craft type the parent names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A craft type is ordered by the game number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A research line is ordered by the display order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A trait is matched to the game's record by the trait's name in lower case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character the store has not read is left out of the answer.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here answers whether a character has finished researching.",
    },
  ],
} as const satisfies Module
