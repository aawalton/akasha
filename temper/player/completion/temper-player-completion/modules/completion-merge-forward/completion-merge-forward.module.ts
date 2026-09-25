import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionMergeForward = {
  id: "01a06108-2ff2-712b-8e7f-f0ad0e33cc0d",
  type: "page-type/module",
  slug: "completion-merge-forward",
  definition: "folding a fresh reading of a player's progress into what was already counted",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
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
      statement: "A list is an array, as the completion record's schema reads every list.",
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
      statement: "A merged id list is sorted.",
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
      decisionKind: "decision-kind/departure",
      statement: "A record is merged key by key, whatever its keys are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A merged reading is read back through its record's schema rather than asserted.",
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
