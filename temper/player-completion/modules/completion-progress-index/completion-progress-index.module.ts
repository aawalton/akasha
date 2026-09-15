import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionProgressIndex = {
  id: "01a0640c-1e9b-7ed3-97f9-cf48e60107c6",
  type: "module",
  slug: "completion-progress-index",
  definition: "every completion card and path counted once across a whole roster of characters",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path a card cannot measure is left out of the index rather than counted as zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The counts a roster path has are the counts of its characters added up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which character a roster path falls to is named as the effective character.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A row has no link.",
    },
  ],
} as const satisfies Module
