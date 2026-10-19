import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionRecord = {
  id: "01a0607a-9cbc-7c27-9e61-4050a73b66e7",
  type: "page-type/module",
  slug: "completion-record",
  definition: "the whole of what an account, character or companion has finished",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each completion's type is inferred from the zod schema this module's code holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The schema describes a completion body as the tree stores it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list the saved variables stored as an object numbered from one is read as an array.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body carrying a key the schema does not declare is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character's reported stats are the character sheet's numbers as the game gave them, for each bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps each buff active when it was taken, by ability id and name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading of reported stats keeps the points spent on each champion star.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps each skill on the bar held, as the game gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps each class passive bought, with its tooltip as the game gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps whether it was taken in the Archive, and the boons held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps the advanced stats the rotation reading takes, by metric.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A character keeps the add-on's last rotation reading and each bar's inputs to it.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A reading that kept buff ids alone is still read, until a fresh reading replaces it.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A character's bank visit date is still read, so an old record is not refused.",
    },
  ],
  createdAt: "2026-09-02T04:57:23.388Z",
  updatedAt: "2026-10-19T19:34:48.550Z",
} as const satisfies Module
