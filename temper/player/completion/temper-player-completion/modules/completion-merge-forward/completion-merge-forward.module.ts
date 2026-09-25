import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionMergeForward = {
  id: "01a06108-2ff2-712b-8e7f-f0ad0e33cc0d",
  type: "page-type/module",
  slug: "completion-merge-forward",
  definition: "folding a fresh reading of a player's progress into what was already counted",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A count merged forward never falls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handful of fields take the fresh reading whole rather than merging.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list is a record keyed by the positions 1 to n, as the game writes a list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a list holds decides how that list is merged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list holding only numbers holds ids, and is merged as the set of both readings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A merged id list keeps the fresh reading's order, and the ids only the stored list held follow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list holding only records or lists is merged position by position.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other list takes the fresh reading whole.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A record of numbers whose keys happen to run 1 to n is read as an id list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A curse follows the latest reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A curse the game stopped writing is dropped rather than kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The day's writ states take the fresh reading whole, as the day's writ count does.",
    },
  ],
} as const satisfies Module
