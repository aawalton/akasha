import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionProgressIndex = {
  id: "01a0640c-1e9b-7ed3-97f9-cf48e60107c6",
  pageTypeSlug: "module",
  slug: "completion-progress-index",
  definition:
    "every completion card and path counted once, for a character, an account, or a roster",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path a card cannot measure is left out of the index rather than counted as zero.",
    },
    {
      invariantKind: "departure",
      statement: "The counts a roster path carries are the counts of its characters added up.",
    },
    {
      invariantKind: "departure",
      statement: "Which character a roster path falls to is named as the effective character.",
    },
    {
      invariantKind: "absence",
      statement: "A row carries no link.",
    },
  ],
} as const satisfies Module
