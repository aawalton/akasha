import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionProgressIndex = {
  id: "01a0640c-1e9b-7ed3-97f9-cf48e60107c6",
  type: "page-type/module",
  slug: "completion-progress-index",
  definition: "every completion card and path counted once across a whole roster of characters",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path a card cannot measure is left out of the index rather than counted as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a caller names is counted alongside the paths the card's picker offers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path named twice is counted once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The counts a roster path has are the counts of its characters added up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which character a roster path falls to is named as the effective character.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A row has no link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account card is counted once for the roster and on no character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account card is read back as one row, on the character the caller names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roster with no character carries no account card.",
    },
  ],
} as const satisfies Module
